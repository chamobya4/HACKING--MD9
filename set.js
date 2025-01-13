const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' }); 
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'HACKING-MD;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiU0hRbUluYmNoRVEwZTU5UHU2NnhRbzF1MDJzZEp0VHNDM3Q5NjcxaDJWST0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibFNKUHdEczRWSTAvcktPOFVWYTNVL1N5dlpudzdpM0I2ODVLRUgrMkRWUT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ1T3IrOUZxYXBhSzg3akNLa1ZRTFF3Z0h3Z2RNNEVNdEJhRGIwbk0wMTJFPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJsZVY5S1cySktMTHU4SFFTa2VEdkxjZWRkb21qSUtMaXdGdjFTd056Y1JFPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IllIS2NTanptQXUwRWZZTVJ6RHE2cGZ3NXJCUzJCV0h3NmVnOEZTaW9ubUE9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InNVL0V6ZFZCMC9FUENDU0l6V0p1bk81b29hSVpRUmN4Z2k5M0tUbWpTVU09In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoic0NLWFd6Z1ExYWlzMWQ2ODhRNXJKSDZGWFZCU0M3L0trRFY0NHRnNFpXZz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiU1VwSXQzTXcwOVNITm9qb2dlOWkwUE9UdXVQUngxV1BJWFh0ajNaV3VUTT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkViNkVic09sQ0lXNHhmdEhIWGRudmdnVmRTOTlhYkc2TkJHdEpnKzgwbGpUTzRKSmtyOUpBOFl3SHAyOHdxcFpxR3RuRDBtaW5PSFlZWnJEZW5VbkFBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NTQsImFkdlNlY3JldEtleSI6Ikt5dnppZUMvcjArMmlsaGhCZHpFNlZNcmtOSmpvSmJ1MFVBL0J1bDBEaVk9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6ImpCSjEyQTJTVExlUm5EV0xqbTJiVWciLCJwaG9uZUlkIjoiNjI5MGIxNzMtZDIxZi00ODkzLWI2NmItMDllZThiMmI1MmNiIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkxScWE1eUFxVldXaW9BMkxkOHFYQ2xzOVZyaz0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI4NGVkM1h6eTdSenEyVi9iQjJXK1UwOUt0N0k9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiMlg1MVpEQ0ciLCJtZSI6eyJpZCI6Ijk0Nzc5MDkxNTk2OjJAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoi6qq2QVRIQUwgUE9EREHhrYQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ1ByYW91RUdFT3Vja3J3R0dBRWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IjB1bmxWWnZYRTdZSWduMkNwaGEydW1ZbjlJaGNKdUFvRDVQVUNmQnFnVFU9IiwiYWNjb3VudFNpZ25hdHVyZSI6IkN6THVBcS9XVHQ0R3ZJWWJkVjRqcHIrSi9aQVpRZG8rOWFQV21HVGNNMFl4ZFJ1d2hxOERRWE1xeGxoZkZ3TmVhOFZwc0RxRFp5SWNTUCtHUmduYkNnPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJaaG9FTU4rTENHVWdTSGxHYmdnT3dqUThoRW9rbFdoSERNNlBkVzNJb3FiWGFnbTVJZnpsWlFZVWpyelZtaDlRRksyN1hBdDIrOUxXbm4zQlU5enREdz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6Ijk0Nzc5MDkxNTk2OjJAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCZExwNVZXYjF4TzJDSUo5Z3FZV3RycG1KL1NJWENiZ0tBK1QxQW53YW9FMSJ9fV0sInBsYXRmb3JtIjoic21iYSIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTczNjc0MDQ3Mn0=',
     ETAT:process.env.ETAT,
    PREFIXE: process.env.PREFIXE,
    NOM_OWNER: process.env.NOM_OWNER || "Hacking-Md",
    NUMERO_OWNER : process.env.NUMERO_OWNER,              
    LECTURE_AUTO_STATUS: process.env.LECTURE_AUTO_STATUS || "non",
    TELECHARGER_AUTO_STATUS: process.env.TELECHARGER_AUTO_STATUS || 'non',
    MODE: process.env.MODE_PUBLIC,
    PM_PERMIT: process.env.PM_PERMIT || 'non', 
    CODE_PAYS: process.env.CODE_PAYS || '509',  // Variable d'environnement pour l'API qu'on utilise       
    BOT : process.env.NOM_BOT || 'Hacking_MD',
    URL : process.env.LIENS_MENU || 'https://static.animecorner.me/2023/08/op2.jpg',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    CHAT_BOT : process.env.CHAT_BOT || 'non' ,          
    //GPT : process.env.OPENAI_API_KEY,
    DP : process.env.STARTING_BOT_MESSAGE || 'oui',
    CHATBOT : process.env.PM_CHATBOT || "non",     
    ATD : process.env.ANTI_DELETE_MESSAGE || 'non',
    ANTI_VV: process.env.ANTI_VUE_UNIQUE || 'non' ,
                  
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
   DB: process.env.DB || 'postgres://neoverse:pomrleUMXwlmlpIcW2oFJmMX0CXzaFkf@dpg-combonun7f5s73d7uoog-a.oregon-postgres.render.com/neoverse_wz98',
                  /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
