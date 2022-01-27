<template>
  <div class="flex-container">
    <div class="menu">
      <menu class="sideMenu">
        <div class="logo">
          <router-link to="/">
            <img class="logo" src="/logo.svg" alt="Trinidad Wiseman Logo" />
          </router-link>
        </div>
        <ul class="menuBar">
          <li>
            <router-link to="/article"
              >ARTIKKEL
              <font-awesome-icon icon="file" />
            </router-link>
          </li>
          <li>
            <router-link to="/list"
              >TABEL
              <font-awesome-icon icon="table"> </font-awesome-icon>
            </router-link>
          </li>
        </ul>
      </menu>
    </div>

    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>


