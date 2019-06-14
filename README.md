ProjectHol

Making Alcohol Great Again!


Problem Statement:

Counterfeit alcohol is one of the grave problems that the state has been facing for a very long time. The huge economic burden of counterfiet alcohol is in addition to the risk it incurs to drinkers, which includes fatalities and blindness.

The government spends considerable sum of money in mainitaining a capable workforce in the Excise department to tackle the issue, but the problem still persists due to loopholes and inefficiencies in the system.

This is a solution which involves the capabilites of Hyperledger Sawtooth in asset tracking across a supply chain with multiple players and stakeholders.


Solution:

A system where each bottle is assigned a unique id upon its creation, and is tracked across the entire supply chain until it reaches  the consumer in a transparent and verifiable manner.



The Network’s Capabilities:

1. Create a unique id for each bottle manufactured
2. Traverse the id down to different stakeholders of the supply chain as the bottle makes its journey
3. Apend information onto the id by the permissioned actors.
4. Read the complete history of the bottle’s journey from the blockchain once the sale is made.



Installation Instructions:

Install angular CLI,node,nginx,docker prior to installing this.

1.	Clone project from the gitlab url.
2.	In a terminal go to /projectholclient and execute command ‘ng build’. Copy the path of the dist folder into the root value of the nginx.conf file.
3.	Copy this nginx.conf file and replace it at /etc/var/nginx/nginx.conf
4.	Run: sudo /etc/init.d/nginx restart
5.	In a terminal go to the root of the project folder and run the following command to initiate the docker container: sudo docker-compose up.
6.	Once the containers are up and running, open a browser and go to http://localhost:4200
7.	For the remaining client views refer Documentation file.
