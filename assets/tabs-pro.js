/**
 * Tabs Pro - Compétences et Stages
 * Accessible tabs with keyboard navigation
 */
(function() {
  'use strict';

  const CONFIG = {
    DEBOUNCE_DELAY: 100,
    TOAST_DURATION: 3000
  };

  const INSTANCES = [
    {
      container: '#skills',
      tabsNav: '#skillsTabsNav',
      tabIndicator: '#skillsTabIndicator',
      tab: '#skills .skills-tabs-pro [role="tab"]',
      panel: '#skills .skills-tabs-pro [role="tabpanel"]',
      toastContainer: '#skillsToastContainer',
      liveRegion: '#skillsLiveRegion'
    },
    {
      container: '#stages',
      tabsNav: '#stagesTabsNav',
      tabIndicator: '#stagesTabIndicator',
      tab: '#stages .skills-tabs-pro [role="tab"]',
      panel: '#stages .skills-tabs-pro [role="tabpanel"]',
      toastContainer: '#stagesToastContainer',
      liveRegion: '#stagesLiveRegion'
    }
  ];

  class EliteTabs {
    constructor(selectors) {
      this.tabsNav = document.querySelector(selectors.tabsNav);
      this.tabIndicator = document.querySelector(selectors.tabIndicator);
      this.tabs = Array.from(document.querySelectorAll(selectors.tab));
      this.panels = document.querySelectorAll(selectors.panel);
      this.toastContainer = document.querySelector(selectors.toastContainer);
      this.liveRegion = document.querySelector(selectors.liveRegion);
      this.currentIndex = 0;
      this.resizeObserver = null;
      if (this.tabsNav && this.tabs.length && this.tabs.length === this.panels.length) this.init();
    }

    init() {
      this.bindEvents();
      this.setupResizeObserver();
      this.updateIndicator(this.tabs[0]);
    }

    bindEvents() {
      this.tabsNav.addEventListener('click', (e) => this.handleTabClick(e));
      this.tabsNav.addEventListener('keydown', (e) => this.handleKeydown(e));
      const settingsBtn = document.getElementById('openSettingsBtn');
      if (settingsBtn) {
        settingsBtn.addEventListener('click', () => this.showToast('Paramètres ouverts'));
      }
      document.querySelectorAll('#skills .skills-tabs-pro .toggle input').forEach(toggle => {
        toggle.addEventListener('change', (e) => {
          const label = e.target.closest('.setting-item')?.querySelector('h4')?.textContent || 'Paramètre';
          this.showToast(label + (e.target.checked ? ' activé' : ' désactivé'));
        });
      });
    }

    setupResizeObserver() {
      let debounceTimer = null;
      this.resizeObserver = new ResizeObserver(() => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
          const activeTab = this.tabs[this.currentIndex];
          if (activeTab) this.updateIndicator(activeTab);
        }, CONFIG.DEBOUNCE_DELAY);
      });
      this.resizeObserver.observe(this.tabsNav);
    }

    handleTabClick(e) {
      const tab = e.target.closest('[role="tab"]');
      if (!tab) return;
      const index = Array.from(this.tabs).indexOf(tab);
      if (index !== -1) this.activateTab(index);
    }

    handleKeydown(e) {
      const key = e.key;
      const tabCount = this.tabs.length;
      let newIndex = this.currentIndex;
      switch (key) {
        case 'ArrowRight':
        case 'ArrowDown':
          newIndex = (this.currentIndex + 1) % tabCount;
          break;
        case 'ArrowLeft':
        case 'ArrowUp':
          newIndex = (this.currentIndex - 1 + tabCount) % tabCount;
          break;
        case 'Home':
          newIndex = 0;
          break;
        case 'End':
          newIndex = tabCount - 1;
          break;
        default:
          return;
      }
      e.preventDefault();
      this.activateTab(newIndex, true);
    }

    activateTab(index, setFocus = false) {
      if (index === this.currentIndex) return;
      if (index < 0 || index >= this.tabs.length) return;

      const prevTab = this.tabs[this.currentIndex];
      const prevPanel = this.panels[this.currentIndex];
      const nextTab = this.tabs[index];
      const nextPanel = this.panels[index];

      prevTab.setAttribute('aria-selected', 'false');
      prevTab.setAttribute('tabindex', '-1');
      prevPanel.setAttribute('aria-hidden', 'true');

      nextTab.setAttribute('aria-selected', 'true');
      nextTab.setAttribute('tabindex', '0');
      nextPanel.setAttribute('aria-hidden', 'false');

      this.updateIndicator(nextTab);
      this.currentIndex = index;
      if (setFocus) nextTab.focus();
      this.announce(nextTab.textContent.trim() + ' sélectionné');
    }

    updateIndicator(tab) {
      if (!tab || !this.tabIndicator || !this.tabsNav) return;
      const tabRect = tab.getBoundingClientRect();
      const navRect = this.tabsNav.getBoundingClientRect();
      const scrollLeft = this.tabsNav.scrollLeft || 0;
      const left = tabRect.left - navRect.left + scrollLeft;
      this.tabIndicator.style.transform = 'translateX(' + left + 'px)';
      this.tabIndicator.style.width = tabRect.width + 'px';
    }

    announce(message) {
      if (!this.liveRegion) return;
      this.liveRegion.textContent = '';
      void this.liveRegion.offsetHeight;
      this.liveRegion.textContent = message;
    }

    showToast(message, duration) {
      duration = duration || CONFIG.TOAST_DURATION;
      if (!this.toastContainer) return;
      const toast = document.createElement('div');
      toast.className = 'toast';
      toast.textContent = message;
      toast.setAttribute('role', 'alert');
      this.toastContainer.appendChild(toast);
      setTimeout(() => {
        toast.classList.add('removing');
        toast.addEventListener('animationend', () => toast.remove(), { once: true });
      }, duration);
    }
  }

  function initTabs() {
    INSTANCES.forEach(function(selectors) {
      new EliteTabs(selectors);
    });
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTabs);
  } else {
    initTabs();
  }
})();
