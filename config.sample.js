let config = {};
config.host= 'smtp.gmail.com';
config.port= 465;
config.secure= true;
config.service= 'Gmail';
config.sendAddr= 'noreply@myapi.com' || process.env.noreply;
config.username= 'test@gmail.com' || process.env.email;
config.password= 'test' || process.env.password;

module.exports = config;
