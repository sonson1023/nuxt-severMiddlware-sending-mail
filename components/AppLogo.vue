<template>
 <div class="container"><br />
      <div class="container">
        <div class="col-xs-6">
          <h1>Simple Email</h1><br/>
        </div>
      </div>
      
      <form action="/send-email" @submit.prevent="sendMail">
        <div class="row">
          <div class="col-xs-6"></div>
          <div class="form-group col-xs-6">
            <label for="to">To:</label>
            <input type="email" class="form-control" name="to" v-model="to">
          </div>
        </div>

        <div class="row">
          <div class="col-xs-6"></div>
          <div class="form-group col-xs-6">
            <label for="name">Subject:</label>
            <input type="text" class="form-control" name="name" v-model="subject">
          </div>
        </div>

        <div class="row">
          <div class="col-xs-6"></div>
            <div class="form-group col-xs-6">
              <label for="msg">Body:</label>
              <textarea cols="20" rows="5" class="form-control" name="msg" v-model="msg"></textarea>
            </div>
        </div>
        <div class="row">
          <div class="col-xs-6"></div>
          <div class="form-group col-xs-6">
            <button type="submit" class="btn btn-success">Send</button>
          </div>
        </div>
      </form>
    </div> 
</template>
<script>
export default {
  data(){
    return{
      subject : null,
      to : null,
      msg : null
    }
  },
  methods:{ 
     
    sendMail : function(){ 
      var url = "/send-email";
      var data = {
        to : encodeURI(this.to),
        subject : this.subject,
        msg : this.msg
      }
      $.ajax(
          {
            type : "post",
            url : url, 
            data :data, 
            contentType: "application/json",
            complete : function (xhr, status) {
              if (xhr.status === 200 && xhr.statusText) {
                var data = xhr.responseText;
                  //...
                  alert('success to send email')
              }
              else {
                  console.log('error');
              }
            }
          }
        );
    }
  },
  mounted() { 
  }
}
</script>


<style> 
</style>

