module.exports = logConfig;

function logConfig(log4js) {
  log4js.configure({
      appenders:[{
          type:'dateFile',
          pattern: "-yyyy-MM-dd",
          filename:'./logs/business.log',
          category:['business']
      },{
          type:'console'
      },{
          type:'dateFile',
          pattern: "-yyyy-MM-dd",
          filename:'./logs/server.log',
          category:['sys','routing','console']
      }],
      replaceConsole:true
  });
}