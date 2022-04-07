<template>
  <div class="container">
    <h2 class="text-center mt-5">Users List</h2>
    <h2 class="text-danger" v-if="error">{{ error }}</h2>
    <div class="d-flex">
      <input
        v-model="user.name"
        type="text"
        placeholder="Enter Name"
        class="form-control"
      />
      <input
        v-model="user.age"
        type="text"
        placeholder="Enter Age"
        class="form-control"
      />
      <input
        v-model="user.gender"
        type="text"
        placeholder="Enter Gender"
        class="form-control"
      />
      <input
        v-model="user.address"
        type="text"
        placeholder="Enter Address"
        class="form-control"
      />
      <button @click="onSubmit" class="btn btn-warning rounded-0">
        SUBMIT
      </button>
    </div>

    <table class="table table-bordered mt-5">
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Age</th>
          <th scope="col">Gender</th>
          <th scope="col" class="text-center">#</th>
          <th scope="col" class="text-center">#</th>
          <th scope="col" class="text-center">#</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user, index) in users" :key="index">
          <td>{{ user.name }}</td>
          <td>{{ user.age }}</td>
          <td>{{ user.gender }}</td>
          <td>
            <div class="text-center" @click="onEdit(user)">
              <span class="fa fa-pen"></span>
            </div>
          </td>
          <td>
            <div class="text-center" @click="deleteuser(user._id)">
              <span class="fa fa-trash"></span>
            </div>
          </td>
          <td>
            <div class="text-center" @click="goToDetails(user._id)">
              <button class="btn btn-info">Details</button>
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
  name: "UserListing",
  props: {
    msg: String,
  },
  data() {
    return {
      user: {
        name: this.name,
        age: this.age,
        gender: this.gender,
      },
      error: "",
      isEditing: false,
      users: [],
    };
  },
  async created() {
    this.setUser();
  },
  methods: {
    goToDetails(id) {
      this.$router.push(`/users/${id}/details`);
    },
    async setUser() {
      const response = await axios.get("http://localhost:3000/");
      this.users = response.data;
    },
    async submituser() {
      try {
        await axios.post("http://localhost:3000/user/", {
          name: this.user.name,
          age: this.user.age,
          gender: this.user.gender,
          address: this.user.address,
        });
        this.user = {};
        this.setUser();
      } catch (error) {
        if (error.response) {
          this.error = error.response.data;
        }
      }
    },
    async deleteuser(id) {
      await axios.delete("http://localhost:3000/user/" + id);

      this.setUser();
    },
    onEdit(user) {
      this.user = { ...user };
      this.isEditing = true;
    },
    onSubmit() {
      if (this.isEditing) {
        this.updateUser(this.user);
        return;
      }
      this.submituser();
    },
    async updateUser(user) {
      try {
        await axios.put("http://localhost:3000/user/" + user._id, {
          name: this.user.name,
          age: this.user.age,
          gender: this.user.gender,
        });
        this.isEditing = false;
        this.user = {};
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

