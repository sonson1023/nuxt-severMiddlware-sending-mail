 
const nodemailer = require('nodemailer')  
const qs = require('querystring');

var transporter = nodemailer.createTransport({
    service:'gmail',
    secure: true,
    port : 465,
    host : 'smtp.***.***',
    auth: {
        user : 'your id',
        pass : 'your password'
    }
});

var mailOption = {
    from : 'mail@mailcom',
    to : '',
    subject : '',
    text : ''
};
  
export default function (req, res, next ) {
    // req is the Node.js http request object
 
    var body = ""; 
    // console.log('hello')
    if(req.originalUrl == '/send-email' && req.method == "POST"){
        try {
            if(req.readable == true)
                body += req.read();
            var post = qs.parse(body);
            // post.to = decodeURI(post.to);
            console.log(post);

            mailOption.text = post.msg;
            mailOption.to = post.to; 
            transporter.sendMail(mailOption, function(err, info) {
                if ( err ) {
                    console.error('Send Mail error : ', err);
                }
                else {
                    console.log('Message sent : ', info);  
                    res.writeHead(200, {
                        'Content-Type': 'application/json; charset=utf-8', 
                        }); 
                    // res.json({result : "success"});
                    res.end(); 
                }
            });
 
            // req.on("end", function(){
            //     console.log(body);
            //     mailOption.text = body;
            //     var to, subject, msg; 
            //     // transporter.sendMail(mailOption, function(err, info) {
            //     //     if ( err ) {
            //     //         console.error('Send Mail error : ', err);
            //     //     }
            //     //     else {
            //     //         console.log('Message sent : ', info);
            //     //         res.writeHead(200, {
            //     //             'Content-Type': 'application/json', 
            //     //           });
            //     //         res.end();
            //     //     }
            //     // });
                
                
            // }) 
        } catch (error) {
            console.log('simpleEmail error : ' + error);
        }
        
    } 
    // res is the Node.js http response object

    // next is a function to call to invoke the next middleware
    // Don't forget to call next at the end if your middleware is not an endpoint!
    next()
}
