var v = require('valentine')
  , Faker = require('Faker')
  , util = require('util')
  , exec = require('child_process').exec, child;

// Globals
after = function(ms, cb){
  setTimeout(cb,ms);
}
every = function(ms, cb){
  setInterval(cb, ms);
}

var team1DNS = '8.8.8.8';
var team2DNS = '8.8.4.4';
var team3DNS = '4.3.2.1';
var dnsServers = [team1DNS,team2DNS,team3DNS];

genSite = function(){
  var date = new Date();
  if((date.getSeconds() % 2) === 0) return Faker.Internet.domainWord()+Faker.Internet.domainName()
  else return 'www.google.com'
}

// DNS Requests
every(500, function(){
  v.each(dnsServers, function(dns){
    var site = genSite();
    // Child-Processes should be refactored out.
    child = exec('dig @'+dns+' +short '+site,
      function (error, stdout, stderr) {
        if(stdout.toString() !== "") console.log(stdout.toString());
        else console.log('No return for '+site)
        if(stderr) console.log('stderr: ' + stderr);
        if (error !== null) {
          console.log('exec error: ' + error);
        }
    })
  })
})

// HTTPS Requests

// HTTP Requests

// FTP Requests

// SSH / SFTP Requests

// SMTP Requests
// -- Should be one or the other?
// SMTPS Requests

// POP3

// IMAP
