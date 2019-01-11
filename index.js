

const minimist = require('minimist');
const edition = require('./package.json').version;
const weatherAjax = require('./weater_ajax.js');
const ora = require('ora');

const loading = ora();

module.exports = () => {
    //前两个是编译器相关路径信息，可以忽略
    const args = minimist(process.argv.slice(2));

    console.log(args);

    let cmd = args._[0] || 'help';

    if (args.v || args.version) {
      cmd = 'version';

    }
    //地理位置信息
    let location = args.location || '北京';
    //进度开始
    loading.start();
    //请求天气信息
    weatherAjax(location).then((data) => {

      data = data.results[0];
      //位置
      let position= data.location;
      //日期
      let daily = data.daily;

      switch(cmd){

        case 'today':

          // console.log('今天天气不错呢，暖心悦目！';
          console.log(`${position.timezone_offset}时区，${position.name}天气，${position.country}`);
          console.log(`今天${daily[0].date}白天：${daily[0].text_day}夜晚：${daily[0].text_night}`);
          loading.stop();
          break;
        case 'tomorrow':

          console.log('明天下大雨，注意带雨伞！');
          loading.stop();

          break;
        case 'version':
          console.log(edition);
          loading.stop();

          break;
        case 'help': 
          console.log(`
          weather [command] <options>
      
              today .............. show weather for today
              tomorrow ............show weather for tomorrow
              version ............ show package version
              help ............... show help menu for a command
        `)
          loading.stop();
          break;
        default: 
        console.log('你输入的命令无效')
        loading.stop();
      }
    }).catch((err) => {
      loading.stop();
      console.log(err)
    });
}




