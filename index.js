const express = require("express");
const app = express();
const Rabbitmq = require("./rabbitmq");
const url = "amqp://localhost"; //rabbitmq url
const queue = "web_msg"; //임시 queue이름이고 필요한 상황에 맞게 이름 따로 지정해줘야 한다.


const test = async (req, res) => {
    try {
        const conn = new Rabbitmq(url, queue);
        const msg = await conn.recv_message();
        console.log(msg)

        const today = new Date();   
        const hours = ('0' + today.getHours()).slice(-2); 
        const minutes = ('0' + today.getMinutes()).slice(-2);
        const now_time = hours + ':' + minutes
        console.log(now_time);

        const fix_format = msg.split('"')[1];
        const alarm_time = fix_format.split('/')[0];
        const alarm_user = fix_format.split('/')[1];
        const alarm_content = fix_format.split('/')[2];
        console.log(alarm_time);
        
        console.log('체크');
        if(now_time === alarm_time){
            console.log('성공')
        }else{
            console.log('시간불일치')            
        }
        // res.status(200).json({ result: msg });
    } catch (error) {
        console.log(error)
    }
}

setInterval(test, 60000);
