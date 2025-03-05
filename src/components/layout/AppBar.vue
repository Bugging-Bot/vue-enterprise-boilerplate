<template>
  <v-app-bar class="app-bar">
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

// Access the EventBus store
const eventBus = useEventBusStore()
// State for local bar visibility
const localBarVisible = ref(false)

// Composables
const router = useRouter()
const { logout: auth0Logout } = useAuth0()

// State
const isSearchActive = ref(false)
const searchQuery = ref('')
const localBarIcon = ref('mdi-arrow-collapse-up') // Initial icon

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
}

.app-bar__nav {
  display: flex;
  align-items: center;
}
.app-bar__search {
  width: auto;
  transition: all 0.3s ease;
}

.app-bar__search--active {
  flex-grow: 1;
  max-width: 600px;
  margin: 0 16px;
}

.app-bar__search-field {
  width: 100%;
}
.app-bar__actions {
  display: flex;
  align-items: center;
  gap: 8px;
}
</style>
