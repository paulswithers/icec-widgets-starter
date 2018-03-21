module.exports = function server() {
    const readline = require('readline');
    const mp = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: '> '
    });

    mp.prompt();

    let showHelp = 'EXIT [password]          Exit server \n';
    showHelp = showHelp + 'HELP                     Help (Displays this help information)\n';
    showHelp = showHelp + 'QUIT [password]          QUIT (Exit server)\n';
    showHelp = showHelp + 'SHOW                     Show server information:\n';
    showHelp = showHelp + '  SERVER                   Server information\n';
    
    let showServer = `IBM Domino (r) Server (64 Bit) (Release 9.0.1 for Linux/64) 12/20/2016 08:48:12 PM

Server name:            icsdp02.ibmcollabcloud.com/icstechsales
Domain name:            icstechsales
Server directory:       /local/notesdata
Partition:              .local.notesdata
Elapsed time:           00:18:14
Transactions/minute:    Last minute: 0; Last hour: 0; Peak: 0
Peak # of sessions:     0 at 
Transactions: 0         Max. concurrent: 80
ThreadPool Threads:     80  (TCPIP Port)
Availability Index:     100 (state: AVAILABLE)
Mail Tracking:          Not Enabled
Mail Journalling:       Not Enabled
Number of Mailboxes:    1
Pending mail: 0         Dead mail: 0    
Waiting Tasks:          0
DAOS:                   Not Enabled
Transactional Logging:  Not Enabled
Fault Recovery:         Not Enabled
Activity Logging:       Not Enabled
Server Controller:      Not Enabled
Console Logging:        Not Enabled
DB2 Server:             Not Enabled`;

    mp.on('line', (line) => {
        switch(line.trim().toLowerCase()) {
            case 'l':
            case 'show':
            case 'sh':
            case 'te':
                console.log(`Insufficient arguments.  Enter 'HELP' for the correct syntax.`);
                break;
            case 't':
                console.log('Command or option is ambiguous.');
                break;
            case 'exit':
            case 'quit':
            case 'e':
            case 'q':
                mp.close();
                break;
            case 'help':
                console.log(showHelp);
                break;
            case 'show server':
            case 'sh server':
                console.log(showServer);
                break;
            case '':
                break;
            default:
                console.log(`Command or option is not recognized'. Have you tried using help?`);
                break;
        }
        mp.prompt();
    }).on('close', () => {
        console.log('Server shutdown complete.  Hope to see you again!');
        process.exit(0);
    });
};