public with sharing class ContactLookUp {
    @AuraEnabled
    public static List<Contact> searchContact(String inputkey){
        try {
            if(String.isBlank(inputkey)){
                return new List<Contact>();
            }else {
            String key = '%'+inputkey.trim() +'%';
            String searchkey = key.toLowercase();
            return [ Select Id, Name, Email from Contact  WITH_SECURITY_ENFORCED where Name Like: (searchkey) OR Email Like: (searchkey) LIMIT 10];
            
        } 
    }catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    @AuraEnabled
    public static void sendContactEmail(List<Id> conId, String conSubject, String conMessage){
        List<Contact> conlist = new List<Contact>();
        conlist = [select Email from Contact where Id IN: conId AND Email != null Limit 10];
        List<Messaging.SingleEmailMessage> conlistmail = new List<Messaging.SingleEmailMessage>();
        for(Contact con:conlist){
            Messaging.SingleEmailMessage conmail = new Messaging.SingleEmailMessage();
            conmail.setToAddresses (new List<String> {con.Email});
            conmail.setSubject (conSubject);
            conmail.setplainTextBody(conMessage);
             conlistmail.add(conmail);
  
        }
        if(!conlistmail.isEmpty()){
       
        Messaging.sendEmail(conlistmail);
        }


  
    }
  
}
