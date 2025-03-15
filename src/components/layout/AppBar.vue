<template>
  <!-- Set elevation to 0 here to remove shadow from app bar-->
  <v-app-bar class="app-bar" elevation="0">
    <!-- Navigation Section -->
    <div class="app-bar__nav">
      <v-app-bar-nav-icon @click="$emit('toggle-drawer')" />
      <v-app-bar-title>My Application</v-app-bar-title>
    </div>

    <!-- Add v-spacer here -->
    <v-spacer></v-spacer>

    <!-- Search Section -->
    <div class="app-bar__search" :class="{ 'app-bar__search--active': isSearchActive }">
      <v-btn v-if="!isSearchActive" icon @click="toggleSearch">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-text-field
        v-if="isSearchActive"
        v-model="searchQuery"
        density="compact"
        variant="solo"
        label="Search"
        :append-inner-icon="'mdi-close'"
        single-line
        hide-details
        class="app-bar__search-field"
        @click:append-inner="closeSearch"
        @keyup.enter="executeSearch"
      />
    </div>

    <!-- Actions Section -->
    <div class="app-bar__actions">
      <v-btn icon aria-label="User Account">
        <v-icon>mdi-account</v-icon>
      </v-btn>

      <v-btn icon aria-label="Notifications">
        <v-icon>mdi-bell</v-icon>
      </v-btn>

      <v-btn icon @click="toggleLocalBar" aria-label="Toggle Local Bar">
        <v-icon>{{ localBarIcon }}</v-icon>
        <!-- Example icon for toggling -->
      </v-btn>

      <v-btn icon @click="toggleLocalDrawer" aria-label="Toggle Local Drawer">
        <v-icon>{{ localDrawerIcon }}</v-icon>
      </v-btn>

      <v-menu>
        <template #activator="{ props }">
          <v-btn icon v-bind="props" aria-label="More Options">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="(item, index) in menuItems"
            :key="index"
            @click="handleMenuAction(item.action)"
          >
            {{ item.title }}
          </v-list-item>
        </v-list>
      </v-menu>

      <PlanMenu />
      <SettingsMenu />
    </div>
  </v-app-bar>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuth0 } from '@auth0/auth0-vue'
import { useRouter } from 'vue-router'
import { useEventBusStore } from '@/stores/eventBus'

/********General setup ********/
// Access the EventBus store
const eventBus = useEventBusStore()
// Composables
const router = useRouter()
const { logout: auth0Logout } = useAuth0()

/********Local Bar setup ********/
// State for local bar visibility
const localBarVisible = ref(false)
const localBarIcon = ref('mdi-arrow-collapse-down') // Initial icon
// Toggle Local Bar event - Emit globally
const toggleLocalBar = () => {
  console.log('Emitting toggle-local-bar event...')
  // Emit the global event 'toggle-local-bar-pub-sub'
  eventBus.emit('toggle-local-bar', { message: !localBarVisible.value })
  //eventBus.emit('toggle-local-bar', { message: true })
}
// Listen for icon changes from LocalBar
eventBus.on('local-bar-icon-change', (icon) => {
  localBarIcon.value = icon
})

/******** Local Drawer setup ********/
// state for local drawer visibility
const localDrawerVisible = ref(false)
const localDrawerIcon = ref('mdi-arrow-collapse-right') // Initial icon
// Toggle Local Drawer event - Emit globally
const toggleLocalDrawer = () => {
  console.log('Emitting toggle-local-drawer event...')
  // Emit the global event 'toggle-local-drawer-pub-sub'
  eventBus.emit('toggle-local-drawer', { message: !localDrawerVisible.value })
  //eventBus.emit('toggle-local-drawer', { message: true })
}
// listen for icon changes for LocalDrawer
eventBus.on('local-drawer-icon-change', (icon) => {
  localDrawerIcon.value = icon
})

// State
const isSearchActive = ref(false)
const searchQuery = ref('')

// Menu items configuration
const menuItems = [
  { title: 'Settings', action: 'settings' },
  { title: 'Profile', action: 'profile' },
  { title: 'Logout', action: 'logout' }
]

// Methods
const executeSearch = () => {
  if (searchQuery.value.trim()) {
    console.log('Searching for:', searchQuery.value)
    closeSearch()
  }
}

const closeSearch = () => {
  isSearchActive.value = false
  searchQuery.value = ''
}

const toggleSearch = () => {
  isSearchActive.value = !isSearchActive.value
  if (!isSearchActive.value) {
    searchQuery.value = ''
  }
}

const handleMenuAction = (action: string) => {
  switch (action) {
    case 'settings':
      router.push('/settings')
      break
    case 'profile':
      router.push('/profile')
      break
    case 'logout':
      auth0Logout({ logoutParams: { returnTo: window.location.origin } })
      break
  }
}
</script>

<style scoped>
.app-bar {
  display: flex;
  align-items: center;
  height: 48px; /* Reduce the height */
  min-height: 48px; /*Ensure it doesn't stretch */
  /*box-shadow: none; /* Remove the shadow */
  /* border: 1px solid var(--primary-color);*/ /* Add a border for debugging only*/
  box-sizing: border-box; /* Add this to include borders in the element's dimensions */
}

.app-bar__nav {
  display: flex;
  align-items: center;
  /* border: 1px solid blue; Add a border for debugging only */
  /* border-color: var(--info-color); */
  padding: 0px 0px; /* Add padding for better spacing */
  height: 46px; /* Reduce the height */
  min-height: 46px; /*Ensure it doesn't stretch */
  box-sizing: border-box;
}
.app-bar__search {
  width: auto;
  transition: all 0.3s ease;
  /* border: 1px solid green; Add a border for debugging only */
  box-sizing: border-box;
}

.app-bar__search--active {
  flex-grow: 1;
  max-width: 600px;
  margin: 0 16px;
  padding: 0px 0px; /* Padding for better spacing when search is active */
  box-sizing: border-box;
}

.app-bar__search-field {
  width: 100%;
}
.app-bar__actions {
  display: flex;
  align-items: center;
  gap: 8px;
  /* border: 1px solid orange; Add a border for debugging only */
  padding: 0px 0px; /* Add padding to the action buttons */
  height: 46px; /* Reduce the height */
  min-height: 46px; /*Ensure it doesn't stretch */
  box-sizing: border-box;
}
</style>
