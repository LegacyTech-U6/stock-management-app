<template>
  <div class=" bg-gray-100 h-screen">


  <div
    class="flex flex-col items-center space-y-5 justify-center  bg-gray-100 "
  >
     <div class="font-bold text-3xl items-start flex justify-center">Stockly</div>
     <p>Sign in to your account account </p>
  <div
      class="border-none lg:border-5 lg:p-7 p-5 items-center space-y-5 lg:max-w-1/4 sm:w-full bg-white h-5/6 self-center rounded-xl outline-black w-full"
    >
    <div class=" flex justify-start w-full items-start">
      Welcome back
    </div>
    <form action="" >
      <div class="space-y-5">
        <div class="center">
          <label for="email" class="font-bold">Email</label>
          <div class="bg-gray-200 rounded py-2 px-1">
            <input type="text" class="focus:outline-none" placeholder="john@gmail.com" />
          </div>
        </div>
        <div class="space-y-2">
          <label for="passwood" class="font-bold">Password</label>
          <div class="bg-gray-200 rounded py-2 px-1">
            <input type="text" class="focus:outline-none" placeholder="Create your password" />
          </div>
        </div>
        <div class="flex bg-black hover:bg-white  hover:text-black hover:border-1 w-full rounded-xl justify-center text-center items-center p-2">
          <button class="text-white ">Create Account</button>
        </div>
        <hr>
        <div class="flex border-1 w-full rounded-xl justify-center text-center items-center p-2">
          <button class="text-black">Try Demo  Account</button>
        </div>
        <div class="items-center text-center">
            Don't have an account?
        <span class="font-bold"><router-link to="/register"> Sign up</router-link></span>
        </div>
      </div>
    </form>
  </div>
</div>
  </div>
</template>
<script lang="ts">

</script>
