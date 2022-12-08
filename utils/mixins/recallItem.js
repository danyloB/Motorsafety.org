export default {
  methods: {
    handleCollapseShowHide: (action, elmId) => {
      const scheduleBtn = document.getElementById(`list-btn-${elmId}`)
      const descDiv = document.getElementById(`list-desc-${elmId}`)

      if (action === 'show') {
        scheduleBtn && (scheduleBtn.style.display = 'none')
        descDiv && descDiv.classList.add('w-100')
      } else {
        scheduleBtn && (scheduleBtn.style.display = 'block')
        descDiv && descDiv.classList.remove('w-100')
      }
    }
  }
}
