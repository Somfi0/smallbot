const { readdirSync } = require('fs')
const ascii = require('ascii-table')
const table = new ascii('events', 'status')

module.exports = (client)=>{
    readdirSync('./events/').forEach((folder)=>{
        const files = readdirSync(`./events/${folder}`).filter((file) => file.endsWith('.js'))
        for(const fil of files){
            const event = require(`../events/${folder}/${fil}`)
            if(event.name){
                table.addRow(event.name, '✅')
                client.events.set(event.name, event)
                if(event.once){
                    client.once(event.name, (...args) => event.execute(client, ...args))
                }else{
                    client.on(event.name, async (...args)=> event.execute(client, ...args))
                }
            }else{
                table.addRow(fil, '❌')
            }
        }

    })
}
console.log(table.toString())