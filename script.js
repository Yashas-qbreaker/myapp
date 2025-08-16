document.addEventListener('DOMContentLoaded', function () {
  // Map form fields to preview elements
  const fieldMap = [
    { input: 'name', preview: 'preview-name' },
    { input: 'email', preview: 'preview-email' },
    { input: 'phone', preview: 'preview-phone' },
    { input: 'summary', preview: 'preview-summary-text' },
  ];

  fieldMap.forEach(({ input, preview }) => {
    const inputEl = document.getElementById(input);
    const previewEl = document.querySelector('.' + preview);
    if (inputEl && previewEl) {
      inputEl.addEventListener('input', function () {
        previewEl.textContent = inputEl.value || getDefaultValue(input);
      });
    }
  });

  // Get default values for form fields
  function getDefaultValue(fieldName) {
    const defaults = {
      'name': 'OLIVIA WILSON',
      'email': 'olivia.wilson@email.com',
      'phone': '+1 (555) 123-4567',
      'summary': 'Dynamic and results-driven Marketing Manager with 5+ years of experience in developing and executing comprehensive marketing strategies. Proven track record of increasing brand awareness, driving customer engagement, and achieving measurable business growth. Skilled in digital marketing, brand management, and team leadership with a passion for innovative marketing solutions.'
    };
    return defaults[fieldName] || '';
  }

  // --- Education dynamic rows ---
  const educationFieldset = document.querySelector('fieldset:has(legend:contains("Education"))') || document.querySelector('fieldset');
  const educationList = document.querySelector('.education-list');
  const addEducationBtn = document.getElementById('add-education');

  function createEducationRow() {
    const row = document.createElement('div');
    row.className = 'education-row';
    row.innerHTML = `
      <input type="text" name="degree" placeholder="Degree">
      <input type="text" name="school" placeholder="School">
      <input type="text" name="year" placeholder="Year">
      <button type="button" class="remove-education">Remove</button>
    `;
    return row;
  }

  function createEducationPreviewItem(degree, school, year) {
    const li = document.createElement('li');
    li.className = 'education-item';
    li.innerHTML = `
      <strong>${year || 'Year'} - ${school || 'School'}</strong><br>
      ${degree || 'Degree'}
    `;
    return li;
  }

  // --- Experience dynamic rows ---
  const experienceFieldset = document.querySelector('fieldset:has(legend:contains("Experience"))') || document.querySelectorAll('fieldset')[2];
  const experienceList = document.querySelector('.experience-list');
  const addExperienceBtn = document.getElementById('add-experience');

  function createExperienceRow() {
    const row = document.createElement('div');
    row.className = 'experience-row';
    row.innerHTML = `
      <input type="text" name="role" placeholder="Role">
      <input type="text" name="company" placeholder="Company">
      <input type="text" name="duration" placeholder="Duration">
      <button type="button" class="remove-experience">Remove</button>
    `;
    return row;
  }

  function createExperiencePreviewItem(role, company, duration) {
    const li = document.createElement('li');
    li.className = 'experience-item';
    li.innerHTML = `
      <strong>${company || 'Company'} (${duration || 'Duration'})</strong><br>
      <em>${role || 'Role'}</em>
      <ul class="achievement-list">
        <li>Add your achievements here</li>
      </ul>
    `;
    return li;
  }

  // --- Animation functions ---
  function animatePreviewItem(li) {
    li.classList.add('fade-in-up');
    setTimeout(() => li.classList.remove('fade-in-up'), 700);
  }

  function animateRemoveRow(row, callback) {
    row.classList.add('fade-out-down');
    setTimeout(() => {
      row.remove();
      if (callback) callback();
      updateProgressBar();
    }, 500);
  }

  // --- Update preview functions ---
  function updateEducationPreview() {
    if (!educationList) return;
    educationList.innerHTML = '';
    const rows = document.querySelectorAll('.education-row');
    
    if (rows.length === 0) {
      // Show default education if no rows
      const li = document.createElement('li');
      li.className = 'education-item';
      li.innerHTML = `
        <strong>2029 - 2030 BORCELLE UNIVERSITY</strong><br>
        Master of Business Management
      `;
      educationList.appendChild(li);
      return;
    }

    rows.forEach(row => {
      const degree = row.querySelector('input[name="degree"]').value;
      const school = row.querySelector('input[name="school"]').value;
      const year = row.querySelector('input[name="year"]').value;
      if (degree || school || year) {
        const li = createEducationPreviewItem(degree, school, year);
        educationList.appendChild(li);
        animatePreviewItem(li);
      }
    });
  }

  function updateExperiencePreview() {
    if (!experienceList) return;
    experienceList.innerHTML = '';
    const rows = document.querySelectorAll('.experience-row');
    
    if (rows.length === 0) {
      // Show default experience if no rows
      const li = document.createElement('li');
      li.className = 'experience-item';
      li.innerHTML = `
        <strong>Borcelle Studio (2030 - PRESENT)</strong><br>
        <em>Marketing Manager & Specialist</em>
        <ul class="achievement-list">
          <li>Led successful rebranding campaign resulting in 40% increase in brand recognition</li>
          <li>Managed team of 8 marketing professionals and coordinated cross-functional projects</li>
        </ul>
      `;
      experienceList.appendChild(li);
      return;
    }

    rows.forEach(row => {
      const role = row.querySelector('input[name="role"]').value;
      const company = row.querySelector('input[name="company"]').value;
      const duration = row.querySelector('input[name="duration"]').value;
      if (role || company || duration) {
        const li = createExperiencePreviewItem(role, company, duration);
        experienceList.appendChild(li);
        animatePreviewItem(li);
      }
    });
  }

  // --- Add Education Row ---
  if (addEducationBtn && educationFieldset) {
    addEducationBtn.addEventListener('click', function () {
      const newRow = createEducationRow();
      newRow.classList.add('fade-in-up');
      educationFieldset.insertBefore(newRow, addEducationBtn);
      
      // Add listeners for new row
      newRow.querySelectorAll('input').forEach(input => {
        input.addEventListener('input', updateEducationPreview);
      });
      
      newRow.querySelector('.remove-education').addEventListener('click', function () {
        animateRemoveRow(newRow, updateEducationPreview);
      });
      
      setTimeout(() => newRow.classList.remove('fade-in-up'), 700);
      updateProgressBar();
    });

    // Initial row listeners
    document.querySelectorAll('.education-row input').forEach(input => {
      input.addEventListener('input', updateEducationPreview);
    });
    
    document.querySelectorAll('.education-row .remove-education').forEach(btn => {
      btn.addEventListener('click', function () {
        const row = btn.closest('.education-row');
        animateRemoveRow(row, updateEducationPreview);
      });
    });
    
    updateEducationPreview();
  }

  // --- Add Experience Row ---
  if (addExperienceBtn && experienceFieldset) {
    addExperienceBtn.addEventListener('click', function () {
      const newRow = createExperienceRow();
      newRow.classList.add('fade-in-up');
      experienceFieldset.insertBefore(newRow, addExperienceBtn);
      
      // Add listeners for new row
      newRow.querySelectorAll('input').forEach(input => {
        input.addEventListener('input', updateExperiencePreview);
      });
      
      newRow.querySelector('.remove-experience').addEventListener('click', function () {
        animateRemoveRow(newRow, updateExperiencePreview);
      });
      
      setTimeout(() => newRow.classList.remove('fade-in-up'), 700);
      updateProgressBar();
    });

    // Initial row listeners
    document.querySelectorAll('.experience-row input').forEach(input => {
      input.addEventListener('input', updateExperiencePreview);
    });
    
    document.querySelectorAll('.experience-row .remove-experience').forEach(btn => {
      btn.addEventListener('click', function () {
        const row = btn.closest('.experience-row');
        animateRemoveRow(row, updateExperiencePreview);
      });
    });
    
    updateExperiencePreview();
  }

  // --- Clear Form functionality ---
  const clearFormBtn = document.getElementById('clear-form');
  const resumeForm = document.getElementById('resume-form');

  function clearFormAndPreview() {
    // Reset form
    resumeForm.reset();

    // Reset preview to default values
    document.querySelector('.preview-name').textContent = getDefaultValue('name');
    document.querySelector('.preview-email').textContent = getDefaultValue('email');
    document.querySelector('.preview-phone').textContent = getDefaultValue('phone');
    document.querySelector('.preview-summary-text').textContent = getDefaultValue('summary');

    // Remove all but the first education/experience row
    document.querySelectorAll('.education-row').forEach((row, idx) => {
      if (idx > 0) row.remove();
      else {
        row.querySelectorAll('input').forEach(input => input.value = '');
      }
    });
    
    document.querySelectorAll('.experience-row').forEach((row, idx) => {
      if (idx > 0) row.remove();
      else {
        row.querySelectorAll('input').forEach(input => input.value = '');
      }
    });

    // Clear skills
    const skillsContainer = document.getElementById('skills-tags');
    if (skillsContainer) {
      skillsContainer.innerHTML = `
        <span class="skill-tag" data-skill="HTML">HTML <span class="remove-skill">×</span></span>
        <span class="skill-tag" data-skill="CSS">CSS <span class="remove-skill">×</span></span>
        <span class="skill-tag" data-skill="JavaScript">JavaScript <span class="remove-skill">×</span></span>
        <span class="skill-tag" data-skill="Python">Python <span class="remove-skill">×</span></span>
        <span class="skill-tag" data-skill="Other">Other <span class="remove-skill">×</span></span>
      `;
    }

    // Update all previews
    updateEducationPreview();
    updateExperiencePreview();
    updateSkillsPreview();
    updateProgressBar();

    // Re-add event listeners for skills
    addSkillEventListeners();
  }

  if (clearFormBtn) {
    clearFormBtn.addEventListener('click', clearFormAndPreview);
  }

  // --- Download PDF functionality ---
  const downloadBtn = document.getElementById('download-pdf');
  const resumePreview = document.querySelector('.resume-preview');
  
  if (downloadBtn && resumePreview) {
    downloadBtn.addEventListener('click', function () {
      // Show loading state
      downloadBtn.textContent = 'Generating PDF...';
      downloadBtn.disabled = true;
      
      // Generate PDF
      html2pdf().from(resumePreview).save('resume.pdf').then(() => {
        // Reset button
        downloadBtn.textContent = 'Download PDF';
        downloadBtn.disabled = false;
      }).catch(() => {
        // Handle error
        downloadBtn.textContent = 'Download PDF';
        downloadBtn.disabled = false;
        alert('Error generating PDF. Please try again.');
      });
    });
  }

  // --- Progress Bar functionality ---
  const progressBar = document.getElementById('progress-bar');
  
  function getFormCompletionPercent() {
    let total = 0, filled = 0;
    
    // Name, Email, Phone, Summary
    const textFields = ['name', 'email', 'phone', 'summary'];
    textFields.forEach(id => {
      total++;
      const val = document.getElementById(id)?.value.trim();
      if (val) filled++;
    });
    
    // Education rows
    const eduRows = document.querySelectorAll('.education-row');
    eduRows.forEach(row => {
      total += 3;
      if (row.querySelector('input[name="degree"]').value.trim()) filled++;
      if (row.querySelector('input[name="school"]').value.trim()) filled++;
      if (row.querySelector('input[name="year"]').value.trim()) filled++;
    });
    
    // Experience rows
    const expRows = document.querySelectorAll('.experience-row');
    expRows.forEach(row => {
      total += 3;
      if (row.querySelector('input[name="role"]').value.trim()) filled++;
      if (row.querySelector('input[name="company"]').value.trim()) filled++;
      if (row.querySelector('input[name="duration"]').value.trim()) filled++;
    });
    
    // Skills
    const skillTags = document.querySelectorAll('.skill-tag');
    total += skillTags.length;
    skillTags.forEach(tag => { 
      if (tag.classList.contains('selected')) filled++; 
    });
    
    return total ? Math.round((filled / total) * 100) : 0;
  }

  function updateProgressBar() {
    const percent = getFormCompletionPercent();
    if (progressBar) {
      progressBar.style.width = percent + '%';
      progressBar.style.backgroundPosition = `${percent}% 0`;
      progressBar.setAttribute('aria-valuenow', percent);
    }
  }

  // Listen to all form changes
  document.getElementById('resume-form').addEventListener('input', updateProgressBar);
  document.getElementById('resume-form').addEventListener('change', updateProgressBar);

  // Update on add/remove rows
  if (addEducationBtn) addEducationBtn.addEventListener('click', updateProgressBar);
  if (addExperienceBtn) addExperienceBtn.addEventListener('click', updateProgressBar);
  
  document.addEventListener('click', function(e) {
    if (e.target.classList.contains('remove-education') || 
        e.target.classList.contains('remove-experience') || 
        e.target.classList.contains('remove-skill')) {
      setTimeout(updateProgressBar, 100);
    }
  });

  // Update on clear
  if (clearFormBtn) {
    clearFormBtn.addEventListener('click', function() {
      setTimeout(updateProgressBar, 100);
    });
  }

  // --- Skills tags functionality ---
  const skillsTagsContainer = document.getElementById('skills-tags');
  const addSkillInput = document.getElementById('add-skill-input');
  const previewSkillsList = document.querySelector('.preview-skills .skills-list');

  function updateSkillsPreview() {
    if (!previewSkillsList) return;
    previewSkillsList.innerHTML = '';
    
    const selected = Array.from(document.querySelectorAll('.skill-tag.selected, .skill-tag'));
    if (selected.length === 0) {
      // Show placeholder
      ['HTML', 'CSS', 'JavaScript'].forEach(skill => {
        const li = document.createElement('li');
        li.className = 'preview-skill';
        li.textContent = skill;
        previewSkillsList.appendChild(li);
      });
    } else {
      selected.forEach(tag => {
        const li = document.createElement('li');
        li.className = 'preview-skill fade-in-up';
        li.textContent = tag.dataset.skill;
        previewSkillsList.appendChild(li);
        setTimeout(() => li.classList.remove('fade-in-up'), 700);
      });
    }
  }

  // Add skill by typing and pressing Enter
  if (addSkillInput && skillsTagsContainer) {
    addSkillInput.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        const val = addSkillInput.value.trim();
        if (val && ![...skillsTagsContainer.children].some(tag => 
          tag.dataset.skill && tag.dataset.skill.toLowerCase() === val.toLowerCase())) {
          const tag = document.createElement('span');
          tag.className = 'skill-tag selected';
          tag.dataset.skill = val;
          tag.innerHTML = `${val} <span class="remove-skill">×</span>`;
          skillsTagsContainer.appendChild(tag);
          addSkillInput.value = '';
          updateSkillsPreview();
          updateProgressBar();
          
          // Add event listener to new tag
          tag.addEventListener('click', function(e) {
            if (e.target.classList.contains('remove-skill')) {
              tag.classList.add('fade-out-down');
              setTimeout(() => {
                tag.remove();
                updateSkillsPreview();
                updateProgressBar();
              }, 500);
            } else {
              tag.classList.toggle('selected');
              updateSkillsPreview();
              updateProgressBar();
            }
          });
        }
      }
    });
  }

  // Function to add event listeners to skill tags
  function addSkillEventListeners() {
    if (skillsTagsContainer) {
      // Remove existing listeners to avoid duplicates
      skillsTagsContainer.removeEventListener('click', handleSkillClick);
      skillsTagsContainer.addEventListener('click', handleSkillClick);
    }
  }

  function handleSkillClick(e) {
    if (e.target.classList.contains('remove-skill')) {
      const tag = e.target.closest('.skill-tag');
      if (tag) {
        tag.classList.add('fade-out-down');
        setTimeout(() => {
          tag.remove();
          updateSkillsPreview();
          updateProgressBar();
        }, 500);
      }
    } else if (e.target.classList.contains('skill-tag')) {
      e.target.classList.toggle('selected');
      updateSkillsPreview();
      updateProgressBar();
    }
  }

  // Initialize skills
  if (skillsTagsContainer) {
    addSkillEventListeners();
    updateSkillsPreview();
  }

  // --- Initialize everything ---
  updateProgressBar();
  
  // Add input event listeners to existing education and experience rows
  document.querySelectorAll('.education-row input, .experience-row input').forEach(input => {
    input.addEventListener('input', function() {
      if (input.closest('.education-row')) {
        updateEducationPreview();
      } else if (input.closest('.experience-row')) {
        updateExperiencePreview();
      }
      updateProgressBar();
    });
  });
});
