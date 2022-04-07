    <template>
  <div class="container">
    <h2 class="text-center mt-5">User Details</h2>
    <div class="form-control">
      <h3>Name</h3>
      <input v-model="this.user.name" type="text" class="form-control" />
      <br />
      <h3>Age</h3>
      <input v-model="this.user.age" type="text" class="form-control" />
      <br />
      <h3>Gender</h3>
      <input v-model="this.user.gender" type="text" class="form-control" />
      <br />
       
    </div>
    <br>
    <div class="d-flex">
    <input v-model="this.address.name" type="text" class="" placeholder="Enter the Address" />
     <button @click="submit()" class="btn btn-warning rounded-0">
        SUBMIT
      </button>
    </div>
      <br />
    <table class="table table-bordered mt-5">
      <thead>
        <tr>
          <th scope="col">Address</th>       
          <th scope="col" class="text-center">#</th>
          <th scope="col" class="text-center">#</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(address, index) in user.addresses" :key="index">
          <td>{{ address.name }}</td>
          <td>
            <div class="text-center" @click="onEdit(address)">
              <span class="fa fa-pen"></span>
            </div>
          </td>
          <td>
            <div class="text-center" @click="onDelete(address._id)">
              <span class="fa fa-trash"></span>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
  
    
<script>
import axios from "axios";
export default {
  name: "UserDetails",
  created() {
    console.log(this.$route.params, "params");
    this.setUser();
  },
  data() {
    return {
      user: {},
      address:{
          name:""
      },
      isEditing:false
    };
  },
  computed: {

    userId: function () {
      return  this.$route?.params?.userId;
    }
  },
  methods: {
    async setUser() {
      const response = await axios.get(
        "http://localhost:3000/user/" + this.userId
      );
      this.user = response.data;
    },
     async addAddress(){
         await axios.post("http://localhost:3000/user/" + this.userId+"/address",{
             addressName:this.address.name
         })
         this.setUser();
         this.address={}
    },
    submit(){
        if(this.isEditing){
            this.updateAddress(this.address);
            return;
        }
      this.addAddress();
    },
     async onDelete(id) {
      await axios.delete("http://localhost:3000/address/" + id);
      this.setUser();
    },
     onEdit(address) {
      this.address = { ...address };
      this.isEditing = true;
    },
      async updateAddress(address) {
      try {
        await axios.put("http://localhost:3000/address/" + address._id, {
          name: this.address.name,
        });
        this.isEditing=false;
        this.address = {};
        this.setUser();
      } catch (error) {
        if (error.response) {
          this.error = error.response.data;
        }
      }
    },
   
  },
 
};
</script>
