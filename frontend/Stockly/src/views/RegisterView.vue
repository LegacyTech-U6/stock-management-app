<template>
  <div
    class="flex flex-col items-center space-y-5 justify-center h-screen bg-gray-100 "
  >
    <div class="font-bold text-3xl items-start flex justify-center">Join Stockly</div>
    <p>Create your account to get started</p>
    <div
      class="border-none lg:border-5 lg:p-7 p-5 items-center space-y-5 lg:max-w-1/4 sm:w-full bg-white h-5/6 self-center rounded-xl outline-black w-full"
    >
    <div class=" flex justify-start w-full items-start">
      create an account
    </div>

      <form action="" class="space-y-5">
        <div class="grid grid-cols-2 gap-1">
          <div class="text-start space-y-4">
            <label for="First-name" class="font-bold">First Name</label>
            <div class="bg-gray-200 rounded py-2 px-1">
              <input type="text" v-model="user.First_name" class="focus:outline-none" placeholder="John" />
            </div>
          </div>
          <div class="text-start space-y-4">
            <label for="last-name" class="font-bold">Last Name</label>
            <div class="bg-gray-200 rounded py-2 px-1">
              <input type="text" v-model="user.Last_name" class="focus:outline-none" placeholder="Doe" />
            </div>
          </div>
        </div>
        <div class="center">
          <label for="email" class="font-bold">Email</label>
          <div class="bg-gray-200 rounded py-2 px-1">
            <input type="text"  v-model="user.Email" class="focus:outline-none" placeholder="john@gmail.com" />
          </div>
        </div>
        <div>
          <label for="" class="font-bold">Phone(Optional)</label>
          <div class="bg-gray-200 rounded py-2 px-1">
            <input type="text" v-model="user.Phone" class="focus:outline-none" placeholder="+237 675 453 456" />
          </div>
        </div>
        <div class="grid grid-cols-2 gap-1">
          <div class="text-start space-y-4">
            <label for="company" class="font-bold"> Company</label>
            <div class="bg-gray-200 rounded py-2 px-1">
              <input type="text" v-model="user.Company" class="focus:outline-none" placeholder="Your company" />
            </div>
          </div>
          <div class="text-start space-y-4">
            <label for="role" class="font-bold">Role</label>
            <div class="bg-gray-200 rounded py-2 px-1">
              <select name="select" v-model="user.Role" class="focus:outline-none" id="" placeholder="Select role">
                <option value="">Owner</option>
                <option value="">manager</option>
                <option value="">invoice head</option>
              </select>
            </div>
          </div>
        </div>

        <div class="space-y-2">
          <label for="passwood" class="font-bold">Password</label>
          <div class="bg-gray-200 grid grid-cols-3 rounded py-2 px-1">
            <input :type="showPassword ? 'text' : 'password'" required v-model="user.password" class="focus:outline-none col-span-2" placeholder="Create your password" />
            <button type="button" @click="showConfirmPassword = !showConfirmPassword"
                        class="flex justify-end items-end">
                        <svg v-if="!showConfirmPassword" class="h-5 w-5 text-gray-400 hover:text-gray-600" fill="none"
                          stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        <svg v-else class="h-5 w-5 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor"
                          viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L12 12m-2.122-2.122L7.758 7.758M12 12l2.122 2.122m-2.122-2.122L14.122 9.878m-2.12 2.122L9.88 14.12M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </button>
          </div>
        </div>
        <div>
          <label for=""  class="font-bold">Confirm Password</label>
          <div class="bg-gray-200 grid grid-cols-3 rounded py-2 px-1">
            <input   v-model="user.Confirmed_password" :type="showConfirmPassword ? 'text' : 'password'" required class="focus:outline-none col-span-2" placeholder="Confirm the password" />
            <button type="button" @click="showConfirmPassword = !showConfirmPassword"
                        class="flex justify-end items-end">
                        <svg v-if="!showConfirmPassword" class="h-5 w-5 text-gray-400 hover:text-gray-600" fill="none"
                          stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        <svg v-else class="h-5 w-5 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor"
                          viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L12 12m-2.122-2.122L7.758 7.758M12 12l2.122 2.122m-2.122-2.122L14.122 9.878m-2.12 2.122L9.88 14.12M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </button>
          </div>
        </div>

        <div class="flex space-x-1">
          <input type="checkbox" v-model="user.Accepte_terms" name="term" id="" class="bg-gray-200" />
          <label for="">I agree to the officialTerms of Service and pivacy Policy</label>
        </div>
        <hr />

        <div class="flex bg-black w-full rounded-xl justify-center text-center items-center p-2">
          <button class="text-white">Create Account</button>
        </div>
        <hr />
        <div class="items-center text-center">
            Already have an account?
        <span class="font-bold"><router-link to="/login">Sign in</router-link> </span>
        </div>

      </form>
    </div>
    <div class="bg-gray-200 rounded-xl lg:w-1/4">
      <div class="p-5 space-y-5">
        <p class="font-bold">Secure & Private</p>
        <span> Your data is encrypted and protected with undustry standard security measure </span>
      </div>
    </div>
  </div>
  <div>yo {{ user}}</div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
const showPassword = ref(false);
const showConfirmPassword = ref(false);
const user = ref({
  First_name :"",
  Last_name:"",
  Email:"",
  Phone:"",
  Company:"",
  Role:"",
  password:"",
  Confirmed_password:"",
  Accepte_terms:""

})



</script>
