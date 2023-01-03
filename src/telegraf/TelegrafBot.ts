import { Markup, Telegraf } from "telegraf";
import { config } from "../config";
import { UserRepository } from "../users/database/user/UserRepository";
import { IUserDto } from "../users/userDto/UserDto";
import EventEmitter from "events";
import { IListingDto } from "../listings/listingDto/ListingDto";
import { text } from "stream/consumers";

class TelegrafBot {
    bot = new Telegraf(config.BOT_TOKEN);
    activateBtn = Markup.inlineKeyboard([Markup.button.callback("activate", "activate")]);

    async sendActivationMessage(userData: IUserDto, adminId: string) {
        const messageText = `User registered: \n${"name: " + userData.name + "\nemail: " + userData.email + "\nphone: " + userData.phone}`;
        await this.bot.telegram.sendMessage(adminId, messageText, this.activateBtn);
    }

    async sendListingNotification(listing: IListingDto, userId: string) {
        const messageText = `New listing created:\n${'title: ' + listing.title + '\ndescription: ' + listing.description}`;
        await this.bot.telegram.sendMessage(userId, messageText);
    }
    extractUniqueLink(text: string) {
        const [, link] = text.split(' ');
        return link;
    }

    setup() {
        this.bot.start(async (ctx) => {
            if (ctx.message.text.length > '/start'.length) {
                const link = this.extractUniqueLink(ctx.message.text);
                const user = await UserRepository.findOneClient(link);
                if (!user) return;

                user.telegramId = ctx.from.id.toString();
                user.subscribed = true;
                await user.save();
            }
            ctx.reply('Welcome');
        });
        return this.bot;
    }
}

const telegraf = new TelegrafBot();

const eventsEmitter = new EventEmitter();
eventsEmitter.on('signup', async (user: IUserDto) => {
    const admins = await UserRepository.findAdmins();
    Object.values(admins).forEach(async admin => {
        if (admin.telegramId) await telegraf.sendActivationMessage(user, admin.telegramId);
    });

    telegraf.bot.action('activate', async ctx => {
        const userData = await UserRepository.findClientById(user._id);
        if (!userData) return;
        if (userData.isActivated) return ctx.answerCbQuery("already activated");
        userData.isActivated = true;
        await userData.save();
        await ctx.answerCbQuery("activated");
        await ctx.editMessageReplyMarkup({
            inline_keyboard: [
                [
                    Markup.button.callback("activated", "activate")
                ]
            ]
        });
    });


});

eventsEmitter.on('createListing', async (listing: IListingDto) => {
    const subscribedUsers = await UserRepository.findSubscribedUsers();
    if (!subscribedUsers) return
    Object.values(subscribedUsers).forEach(async subscribedUser => {
        if (subscribedUser.telegramId) await telegraf.sendListingNotification(listing, subscribedUser.telegramId)
    });
});

export { eventsEmitter, telegraf };