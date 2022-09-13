const { Telegraf } = require('telegraf')
const axios = require('axios')
const fs = require('fs')
const bot = new Telegraf('token_bot_kamu')
const handlerMsg = `
Hi,
Berikut adalah beberapa fitur yang ada di bot ini!

➸/covidID
➸/fortune
➸/cat
➸/doglist
➸/hentai
➸/porno
➸/waifu [random]
➸/neko [random]
➸/quotes
➸/artinama
➸/lirik
➸/wiki
➸/randomkatacinta

Tracking~
➸/dnslookup
➸/geoIP

➸/reportbug
➸/donasi

`
bot.start((ctx) => {
  ctx.reply('selamat datang '+ctx.from.first_name+' untuk menggunakan bot ini silahkan ketik /menu untuk informasi lebih lanjut')

})

bot.command('menu', (ctx) => {
  ctx.reply(handlerMsg)
})

bot.command('fortune', (ctx) => {
  setTimeout(() => {
    axios.get('http://yerkee.com/api/fortune')
    .then(res => {
      ctx.reply(res.data.fortune)
    }).catch(e => {
      console.log(e)
    })

  }, 5000)
})

bot.command('cat', async(ctx) => {
  setTimeout(() => {
    let input = ctx.message.text
    let inputArray = input.split(' ')
    if(inputArray.length == 1){
      try {
        let res = await axios.get('https://aws.random.cat/meow')
        ctx.replyWithPhoto(res.data.file)
        ctx.reply('Untuk menambahkan tulisan pada foto, Ketik /cat <text>')
        console.log(res)
      }catch(e ){
        console.log(e)
      }
    }else{
      inputArray.shift()
      input = inputArray.join(' ')
      ctx.replyWithPhoto(`https://cataas.com/cat/says/${input}`)
    }
  }, 5000)
})

bot.command('doglist', (ctx) =>{
  setTimeout(() => {
    let rawdata = fs.readFileSync('./dog.json', 'utf8')
    let data = JSON.parse(rawdata)
    let message = 'jenis anjing: \n'
    data.forEach(item => {
      message += `~ ${item}\n`
    })
    ctx.reply(message)
    ctx.reply('Untuk menggunakan API ini ketik /dog [jenis anjing]')
  }, 5000)
})

bot.command('dog', (ctx) => {
  setTimeout(() => {
    let input = ctx.message.text.split(' ')
    if(input.length != 2){
      ctx.reply('Anda harus memberi jenis anjing, Contoh /dog shiba')
      return;
    }
    let breedInput = input[1]
    let rawData = fs.readFileSync('./dog.json', 'utf8')
    let data = JSON.parse(rawData)

    if(data.includes(breedInput)){
      axios.get(`https://dog.ceo/api/breed/${breedInput}/images/random`)
        .then(res => {
          ctx.replyWithPhoto(res.data.message)
          console.log(res)
        }).catch(e => {
          console.log(e)
        })
    }
  }, 5000)

})

bot.command('porno', (ctx) => {
  setTimeout(() => {
    axios.get('https://arugaz.herokuapp.com/api/indohot')
    .then(res => {
      console.log(res)
      ctx.reply("Silahkan ngab:\n "+'Judul: '+res.data.result.judul+'\nDurasi: '+res.data.result.durasi+'\nGenre: '+res.data.result.genre+'\nLink: '+res.data.result.url)
      }).catch(e => {
      console.log(e)
    })
  }, 5000)

})

bot.command('covidID', (ctx) => {
  setTimeout(() => {
    axios.get('https://arugaz.herokuapp.com/api/coronaindo')
    .then(res => {
      console.log(res.chatid)
      ctx.reply('Info: \n'+'Kasus Baru'+res.data.kasus_baru+'\nKasus Total: '+res.data.kasus_total+'\nMeninggal'+res.data.meninggal+'\nPenanganan: '+res.data.penanganan+'\nSembuh: '+res.data.sembuh)
    }).catch(e => {
      console.log(e)
    })
  }, 5000)
})

bot.command('waifu', (ctx) => {
  setTimeout(() => {
    axios.get('https://arugaz.herokuapp.com/api/waifu')
    .then(res => {
      ctx.replyWithPhoto(res.data.image)
      ctx.reply('Nama:'+res.data.name)
      console.log(res)
    }).catch(e => {
      ctx.reply('Ada yang error :(')
    })
  }, 5000)
})

bot.command('neko', (ctx) => {
  setTimeout(() => {
    axios.get('https://arugaz.herokuapp.com/api/nekonime')
    .then(res => {
      ctx.replyWithPhoto(res.data.result)
    }).catch(e => {
      console.log(e)
      ctx.reply('Ada yang error :(')
    })
  }, 5000)
})

bot.command('quotes', (ctx) => {
  setTimeout(() => {
    axios.get('https://arugaz.herokuapp.com/api/randomquotes')
    .then(res => {
      console.log(res)
      ctx.reply(res.data.author+'~\n'+res.data.quotes)
    }).catch(e => {
      console.log(res)
      ctx.reply('bad request :(')
    })
  }, 5000)
})

bot.command('artinama', (ctx) => {
  setTimeout(() => {
    let nama_input = ctx.message.text.split(' ')
    if(nama_input.length != 2){
      ctx.reply('Ketik /artinama [nama kamu], !!Nama panggilan satu kata, Contoh: /artinama setyo')
    }
    var hasil_nama = nama_input[1]
    if(hasil_nama){
      axios.get(`https://arugaz.herokuapp.com/api/artinama?nama=${hasil_nama}`)
        .then(res => {
          console.log(res)
          ctx.reply(res.data.result)
        }).catch(e => {
          ctx.reply('404 Bad request :(')
          console.log(e)
        })
    }
  }, 5000)

})

bot.command('lirik', (ctx) => {
  setTimeout(() => {
    let lirik_input = ctx.message.text.split(' ')
    if(lirik_input.length != 2){
      ctx.reply('[❗] Ketik /lirik [judul lagu]')
    }
    var hasil_lagu = lirik_input[1]
    if(hasil_lagu >= lirik_input){
      axios.get(`https://arugaz.herokuapp.com/api/lirik?judul=${hasil_lagu}`)
        .then(res => {
          console.log(res)
          ctx.reply(res.data.result)
        }).catch(e => {
          console.log(res)
          ctx.reply('Lagu tidak ditemukan :(')
        })
    }
  }, 5000)
})

bot.command('reportbug', (ctx) => {
  ctx.reply('Langsung report ke @syn71, jangan lupa kirim bukti berupa screenshot')
})

bot.command('donasi', (ctx) =>{
  ctx.reply('Wah!!, kamu baik sekali silahkan berdonasi di:\nhttps://trakteer.id/syn1901')
})

bot.command('wiki', (ctx) => {
  setTimeout(() => {
    let wiki_input = ctx.message.text.split(' ')
    if(wiki_input.length != 2){
      ctx.reply('Untuk mencari sesuatu di wiki ketik /wiki [sesuatu]')
    }
    var hasil_wiki = wiki_input[1]
    if(hasil_wiki >= wiki_input){
      axios.get(`https://docs-jojo.herokuapp.com/api/wiki?q=${hasil_wiki}`)
        .then(res => {
          console.log(res)
          ctx.reply(res.data.result)
        }).catch(e => {
          ctx.reply('sesuatu itu tidak ditemukan :(')
        })
    }
  }, 5000)

})

bot.command('randomkatacinta', (ctx) =>{
  setTimeout(() => {
    axios.get('https://docs-jojo.herokuapp.com/api/katacinta')
    .then(res => {
      ctx.reply(res.data.result)
    }).catch(e => {
      ctx.reply('ada yang error ngab :(')
      console.log(e)
    })
  }, 5000)
})

bot.command('dnslookup', (ctx) => {
  setTimeout(() => {
    let dns = ctx.message.text.split(' ')
    if(dns.length != 2){
      ctx.reply('Untuk menggunakan API ini ketik /dnslookup [IP/hostname], Contoh /dnslookup detik.com')
    }
    var hasil_dns
    if(hasil_dns = dns[1]){
      axios.get(`https://api.banghasan.com/domain/dnslookup/${hasil_dns}`)
        .then(res => {
          ctx.reply(res.data.hasil)
          console.log(res)
        }).catch(e => {
          console.log(e)
        })
    }
  }, 5000)
})

bot.command('geoIP', (ctx) => {
  setTimeout(() => {
    let geo = ctx.message.text.split(' ')
    if(geo.length != 2){
      ctx.reply('Untuk menggunakan geoip silahkan ketik /geoIP [ip], \nContoh: /geoIP 36.84.13.197')
    }
    var hasil_geo
    if(hasil_geo = geo[1]){
      axios.get(`https://api.banghasan.com/domain/geoip/${hasil_geo}`)
        .then(res => {
          ctx.reply(res.data.hasil)
        }).catch(e => {
          ctx.reply('Ada yang salah :(')
          console.log(e)
      })
    }
  }, 5000)
})

bot.command('hentai', (ctx) => {
  setTimeout(() => {
    axios.get('https://tobz-api.herokuapp.com/api/hentai')
    .then(res => {
      ctx.replyWithPhoto(res.data.result)
    }).catch(e => {
      ctx.reply('ada yang error ngab :(')
    })
  }, 5000)
})


bot.launch()
