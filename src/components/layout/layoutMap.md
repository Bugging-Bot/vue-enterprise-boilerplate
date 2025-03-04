# This document is capturing UI elements of the layout component

with refrence to draw.io diagram
App (Root Component) <v-app>
├── Header (Top Navigation Bar) <v-header>
│ ├── Logo (1.drawio) <v-logo>
│ ├── File Menu <v-menu>
│ ├── Edit Menu
│ ├── View Menu
│ ├── Arrange Menu
│ ├── Extras Menu
│ ├── Help Menu
│ └── Share Button
├── Toolbar (Main Toolbar) <v-toolbar>
│ ├── Zoom Controls (100% ▼) <v-zoom-control>
│ ├── Search Shapes Input <v-text-field>
│ ├── Other Toolbar Buttons (Various icons) <v-btn>
├── Main Content Area <v-main>
│ ├── Sidebar (Left Sidebar) <v-sidebar>
│ │ ├── Search Shapes Input
│ │ ├── Scratchpad Section
│ │ ├── General Section
│ │ ├── Misc Section
│ │ ├── Advanced Section
│ │ ├── Basic Section
│ │ ├── Arrows Section
│ │ ├── Flowchart Section
│ │ ├── Entity Relation Section
│ │ ├── UML Section
│ │ └── More Shapes Button
│ ├── Diagram Canvas (Central White Grid Area) <v-diagram-canvas>
│ └── Right Sidebar (Diagram/Style) <v-right-sidebar>
│ ├── Diagram Tab
│ │ ├── View Section
│ │ │ ├── Grid Checkbox
│ │ │ ├── Page View Checkbox
│ │ │ ├── Background Label and Change Button
│ │ │ ├── Background Color Input
│ │ │ └── Shadow Checkbox
│ │ ├── Options Section <v-options-section>
│ │ │ ├── Connection Arrows Checkbox
│ │ │ ├── Connection Points Checkbox
│ │ │ ├── Guides Checkbox
│ │ │ └── Autosave Checkbox
│ │ ├── Paper Size Dropdown
│ │ ├── Portrait Radio Button
│ │ ├── Landscape Radio Button
│ │ ├── Edit Data Button
│ │ └── Clear Default Style Button
│ └── Style Tab
└── Footer (Page 1 +) <v-footer>

<v-app>
  <v-header>
    <v-logo data-testid="logo" />
    <v-menu data-testid="file-menu">File</v-menu>
    <v-menu data-testid="edit-menu">Edit</v-menu>
    <v-menu data-testid="view-menu">View</v-menu>
    <v-menu data-testid="arrange-menu">Arrange</v-menu>
    <v-menu data-testid="extras-menu">Extras</v-menu>
    <v-menu data-testid="help-menu">Help</v-menu>
    <v-btn data-testid="share-button">Share</v-btn>
  </v-header>

  <v-toolbar>
    <v-zoom-control data-testid="zoom-control">100% ▼</v-zoom-control>
    <v-text-field data-testid="search-shapes-input" />
    <v-btn data-testid="toolbar-button-1" />
    <v-btn data-testid="toolbar-button-2" />
    </v-toolbar>

  <v-main>
    <v-sidebar>
      <v-text-field data-testid="sidebar-search-shapes-input" />
      <v-section data-testid="scratchpad-section">Scratchpad</v-section>
      <v-section data-testid="general-section">General</v-section>
      <v-section data-testid="misc-section">Misc</v-section>
      <v-section data-testid="advanced-section">Advanced</v-section>
      <v-section data-testid="basic-section">Basic</v-section>
      <v-section data-testid="arrows-section">Arrows</v-section>
      <v-section data-testid="flowchart-section">Flowchart</v-section>
      <v-section data-testid="entity-relation-section">Entity Relation</v-section>
      <v-section data-testid="uml-section">UML</v-section>
      <v-btn data-testid="more-shapes-button">More Shapes</v-btn>
    </v-sidebar>

    <v-diagram-canvas data-testid="diagram-canvas" />

    <v-right-sidebar>
      <v-tab data-testid="diagram-tab">Diagram</v-tab>
      <v-tab data-testid="style-tab">Style</v-tab>

      <v-view-section>
        <v-checkbox data-testid="grid-checkbox">Grid</v-checkbox>
        <v-checkbox data-testid="page-view-checkbox">Page View</v-checkbox>
        <v-label>Background</v-label>
        <v-btn data-testid="change-background-button">Change</v-btn>
        <v-color-input data-testid="background-color-input" />
        <v-checkbox data-testid="shadow-checkbox">Shadow</v-checkbox>
      </v-view-section>

      <v-options-section>
        <v-checkbox data-testid="connection-arrows-checkbox">Connection Arrows</v-checkbox>
        <v-checkbox data-testid="connection-points-checkbox">Connection Points</v-checkbox>
        <v-checkbox data-testid="guides-checkbox">Guides</v-checkbox>
        <v-checkbox data-testid="autosave-checkbox">Autosave</v-checkbox>
      </v-options-section>

      <v-select data-testid="paper-size-dropdown" />
      <v-radio-group>
        <v-radio-button data-testid="portrait-radio-button">Portrait</v-radio-button>
        <v-radio-button data-testid="landscape-radio-button">Landscape</v-radio-button>
      </v-radio-group>
      <v-btn data-testid="edit-data-button">Edit Data</v-btn>
      <v-btn data-testid="clear-default-style-button">Clear Default Style</v-btn>

      </v-right-sidebar>

  </v-main>

  <v-footer>
    Page 1 +
  </v-footer>
</v-app>
