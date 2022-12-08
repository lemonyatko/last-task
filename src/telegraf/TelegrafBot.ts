import { Markup, Telegraf } from "telegraf";
import { config } from "../config";
import { UserRepository } from "../users/database/user/UserRepository";
import { IUserDto } from "../users/userDto/UserDto";
import EventEmitter from "events";

class TelegrafBot {
    bot = new Telegraf(config.BOT_TOKEN);
    activateBtn = Markup.inlineKeyboard([Markup.button.callback("activate", "activate")]);

    sendActivationMessage(userData: IUserDto, adminIds: number[]) {

        const messageText = `User registered: \n${"name: " + userData.name + "\nemail: " + userData.email + "\nphone: " + userData.phone}`;
        for (let i = 0; i < adminIds.length; i++) {
            this.bot.telegram.sendMessage(adminIds[i], messageText, this.activateBtn);
        }
    }

    setup() {
        this.bot.use(async (ctx, next) => {
            console.log(ctx);
            return next();
        })

        this.bot.start((ctx) => ctx.reply('Welcome'));
        return this.bot;
    }
}

const telegraf = new TelegrafBot();

const eventsEmitter = new EventEmitter();
eventsEmitter.on('signup', async (user: IUserDto) => {
    const admins = await UserRepository.findAdmins();
    const adminsIds: number[] = [];
    Object.values(admins).forEach(admin => adminsIds.push(admin.telegramId as number));
    telegraf.sendActivationMessage(user, adminsIds);

    telegraf.bot.action('activate', async ctx => {
        const userData = await UserRepository.findClientById(user._id);
        if (!userData) return;
        if (userData.isActivated) return ctx.answerCbQuery("already activated");
        userData.isActivated = true;
        userData.save();
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




export { eventsEmitter, telegraf };