const chalk = require('chalk');
const fs = require('fs');
const yargs = require('yargs');

yargs.command({
    command:'add',
    describe:'add text',
    builder: {
        title:{
            describe:'Title',
            demandOption:true,
            type:'plain text'
        },
        body:{
            describe:'Body',
            demandOption:true,
            type:'plain text'

        },
    },
    handler(argv){
        if(!fs.existsSync('./text.json')){
            let user = [{
                title:argv.title,
                body:argv.body
            }]
            const data = JSON.stringify(user,null,4);
            fs.writeFile('./text.json',data,'utf-8',(err)=>{
                if(err){
                    console.log(err)
                }
                console.log(chalk.yellow('New note created!'))
            })
        }
        /*if(1===1){
            fs.readFile('./text.json','utf-8',(err,data)=>{
                if(err){
                    console.log(err);
                }
                else{
                    const obj = JSON.parse(data,(k, v) => Array.isArray(v) ? v.filter(e => e !== null) : v );
                    //console.log(Object.keys(obj).length)
                    for(var myKey in obj){
                        console.log(myKey)
                        console.log(obj[myKey]["title"])
                        if(obj[myKey]["title"]===argv.title){
                            console.log('Title already taken')
                        }
                    }
                }
            })

        }*/

        else{
            fs.readFile('./text.json', 'utf8', (err, data) => {
                const obj = JSON.parse(data,(k, v) => Array.isArray(v) ? v.filter(e => e !== null) : v );
                    //console.log(Object.keys(obj).length)
                    for(var myKey in obj){}
                if (err) {
                    console.log(`Error reading file from disk: ${err}`);
                } 
                
                if(obj[myKey]["title"]===argv.title){console.log(chalk.red('Title already taken'))}
                
                else {
            
                    // parse JSON string to JSON object
                    const databases = JSON.parse(data);
                    
            
                    // add a new entry
                    databases.push({
                        title: argv.title,
                        body: argv.body
                    });
            
                    // write new data back to the file
                    fs.writeFile('./text.json', JSON.stringify(databases, null, 4), (err) => {
                        if (err) {
                            console.log(`Error writing file: ${err}`);
                        }
                        console.log(chalk.yellow('New note created!'))
                    });
                }
            
            });
            
        }
    }
});


yargs.command({
    command:'remove',
    describe:'remove key',
    builder: {
        title:{
            describe:'key',
            demandOption:true,
            type:'plain text'
        },
    },
    handler(argv){
        let toremove = argv.title;
        //console.log(toremove)
        fs.readFile('./text.json','utf-8',(err,data)=>{
            if(err){
                console.log(err);
            }
            else{
                const obj = JSON.parse(data,(k, v) => Array.isArray(v) ? v.filter(e => e !== null) : v );
                for(var myKey in obj){}
                    //console.log(obj[myKey]["title"])
                    //console.log(myKey)
                    if(obj[myKey]["title"]===toremove){
                        delete obj[myKey]
                        delete obj[null]
                        //console.log(obj)
                    
                        fs.writeFile('./text.json', JSON.stringify(obj, null, 4), (err) => {
                            if (err) {
                                console.log(`Error writing file: ${err}`);
                            }
                            console.log(chalk.blue('Note removed!'))
                        });

                    }
                    else{
                        console.log(chalk.red('Note not found!'))
                    }
                
            }
        })
    }
})


yargs.command({
    command:'list',
    describe:'lists titles',
    /*builder: {
        List:{
            describe:'Title',
            demandOption:true,
            type:'plain text'
        },
    },*/
    handler(){
        fs.readFile('./text.json','utf-8',(err,data)=>{
            if(err){
                console.log(err);
            }
            else{
                const obj = JSON.parse(data,(k, v) => Array.isArray(v) ? v.filter(e => e !== null) : v );
                console.log(chalk.yellow('Your notes:'))
                for(var myKey in obj){
                    console.log(chalk.blue(obj[myKey]["title"]))
                }
            }
        })
    }
})


yargs.command({
    command:'read',
    describe:'reads items',
    builder: {
        title:{
            describe:'key',
            demandOption:true,
            type:'plain text'
        },
    },
    handler(argv){
        fs.readFile('./text.json','utf-8',(err,data)=>{
            //console.log('reached')
            if(err){
                console.log(err);
            }
            else{
                const obj = JSON.parse(data,(k, v) => Array.isArray(v) ? v.filter(e => e !== null) : v );
                //console.log(obj)
                for(var myKey in obj){
                    if(obj[myKey]['title']===argv.title){
                        console.log(chalk.yellow(obj[myKey]['title']))
                        console.log(chalk.blue(obj[myKey]['body']))
                    }
                }
            }
        })
    }
})


yargs.parse()