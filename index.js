const fs = require( 'fs' );

const TelegramBot = require('node-telegram-bot-api');
const token = '1026760605:AAFXaG5cncEq1so1nvbA1wkU2mUWgPRjwAg';
const bot = new TelegramBot(token, {polling: true});
// const idAdmin = 32949386;

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const first_name = msg.chat.first_name;

  if (msg.text) {
    const text = msg.text.toLowerCase();

    if (~text.indexOf("Привет")) {
      bot.sendMessage (chatId, 'Привет' + first_name + '!');      
    } else if (~text.indexOf("start")) {
    } else if (~text.indexOf("закрыть")) {
      bot.sendMessage (chatId, 'Клавиатура закрыта', {
        reply_markup: {
          remove_keyboard: true
        }
      });
    } else if (~text.indexOf("клав")) {
      openKlava(chatId);
    } else if (~text.indexOf("здравст") || ~text.indexOf("прив") || ~text.indexOf("хай")) {
      bot.sendMessage(chatId, 'Привет, привет, ' + first_name + '!');
    } else if (~text.indexOf("сука")) {
      bot.sendMessage(chatId, 'Хтьфу. Пшёл отсюда, ' + first_name);
    } else if (~text.indexOf("про автора")) {
      bot.sendMessage(chatId, 'Про автора бота', {
        reply_markup: {
          inline_keyboard: [
          [
            {
              text: 'Автор',
              irl: 'https://vk.com/kostyakivi'
            }
          ], 
          [
            {
              text: 'Классика',
              callback_data: 'classik'
            }
          ]
          ]
        }
      })
    } else {
      bot.sendMessage(chatId, '' + first_name + ', напиши то, что я тебе сказал!');
    }
  }

  bot.forwardMessage(chatId, idAdmin, msg.message_id);
});

bot.onText(/\/start/, (msg, match) => {

  const chatId = msg.chat.id;
  // const resp = match[1]; 

  bot.sendMessage(chatId, 'Приветик, ' + msg.chat.first_name + '!');
  openKlava(chatId);
});

bot.on('callback_query', (query) => {
  const chatId = query.message.chat.id;
  if (query.data === 'classik') {
    openClassik(chatId, query.message.chat.first_name);
  }
});

bot.on('contact', (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Спасибо! Ваш заказ принят, мы с Вами свяжемся!');
});

function openKlava(chatId) {
   bot.sendMessage(chatId, 'Клавиатура открыта', {
    reply_markup: {
      keyboard: [
        [
          {
            text: 'Классика'
          }, {
            text: 'Закрыть'
          }
        ],
        [
          {
            text: 'Заказать разработку бота',
            request_contact: true
          }
        ],
        [
          {
            text: 'Про автора'
          }
        ]        
      ],
      one_time_keyboard: true
    }  
  }) 
}

var options = {
  reply_markup: JSON.stringify({
    inline_keyboard: [
      [{ text: 'Кнопка 1', callback_data: '1' }],
      [{ text: 'Кнопка 2', callback_data: 'data 2' }],
      [{ text: 'Кнопка 3', callback_data: 'text 3' }]
    ]
  })
};

bot.onText(/\/start_test/, function (msg, match) {
  bot.sendMessage(msg.chat.id, 'Выберите любую кнопку:', options);
});