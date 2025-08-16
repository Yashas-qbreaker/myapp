document.addEventListener('DOMContentLoaded', function () {
  // Map form fields to preview elements
  const fieldMap = [
    { input: 'name', preview: 'preview-name' },
    { input: 'title', preview: 'preview-title' },
    { input: 'email', preview: 'preview-email' },
    { input: 'phone', preview: 'preview-phone' },
    { input: 'address', preview: 'preview-address' },
    { input: 'linkedin', preview: 'preview-linkedin' },
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
      'title': 'MARKETING MANAGER',
      'email': 'olivia.wilson@email.com',
      'phone': '+1 (555) 123-4567',
      'address': 'New York, NY 10001',
      'linkedin': 'linkedin.com/in/oliviawilson',
      'summary': 'Dynamic and results-driven Marketing Manager with 5+ years of experience in developing and executing comprehensive marketing strategies. Proven track record of increasing brand awareness, driving customer engagement, and achieving measurable business growth. Skilled in digital marketing, brand management, and team leadership with a passion for innovative marketing solutions.'
    };
    return defaults[fieldName] || '';
  }

  // === EDUCATION SECTION ===
  const educationFieldset = document.querySelector('fieldset legend').textContent.includes('Education') 
    ? document.querySelector('fieldset') 
    : Array.from(document.querySelectorAll('fieldset')).find(fs => fs.querySelector('legend').textContent.includes('Education'));
  const educationList = document.querySelector('.education-list');
  const addEducationBtn = document.getElementById('add-education');

  function createEducationRow() {
    const row = document.createElement('div');
    row.className = 'education-row';
    row.innerHTML = `
      <input type="text" name="degree" placeholder="Degree">
      <input type="text" name="school" placeholder="School">
      <input type="text" name="year" placeholder="Year">
      <input type="text" name="gpa" placeholder="GPA (optional)">
      <button type="button" class="remove-education">Remove</button>
    `;
    return row;
  }

  function createEducationPreviewItem(degree, school, year, gpa) {
    const li = document.createElement('li');
    li.className = 'education-item';
    const gpaText = gpa ? ` - GPA: ${gpa}` : '';
    li.innerHTML = `
      <strong>${year || 'Year'} - ${school || 'School'}</strong><br>
      ${degree || 'Degree'}${gpaText}
    `;
    return li;
  }

  function updateEducationPreview() {
    if (!educationList) return;
    educationList.innerHTML = '';
    const rows = document.querySelectorAll('.education-row');
    
    if (rows.length === 0) {
      // Show default education
      const li = document.createElement('li');
      li.className = 'education-item';
      li.innerHTML = `
        <strong>2031 BORCELLE UNIVERSITY</strong><br>
        Master of Business Management
      `;
      educationList.appendChild(li);
      
      const li2 = document.createElement('li');
      li2.className = 'education-item';
      li2.innerHTML = `
        <strong>2029 - 2030 BORCELLE UNIVERSITY</strong><br>
        Bachelor of Business Management - GPA: 3.8
      `;
      educationList.appendChild(li2);
      return;
    }

    rows.forEach(row => {
      const degree = row.querySelector('input[name="degree"]').value;
      const school = row.querySelector('input[name="school"]').value;
      const year = row.querySelector('input[name="year"]').value;
      const gpa = row.querySelector('input[name="gpa"]').value;
      if (degree || school || year) {
        const li = createEducationPreviewItem(degree, school, year, gpa);
        educationList.appendChild(li);
        animatePreviewItem(li);
      }
    });
  }

  // === SKILLS SECTION ===
  const skillsFieldset = Array.from(document.querySelectorAll('fieldset')).find(fs => 
    fs.querySelector('legend').textContent.includes('Skills'));
  const skillsList = document.querySelector('.skills-list');
  const addSkillBtn = document.getElementById('add-skill');

  function createSkillRow() {
    const row = document.createElement('div');
    row.className = 'skill-row';
    row.innerHTML = `
      <input type="text" name="skill" placeholder="Enter a skill">
      <button type="button" class="remove-skill-row">Remove</button>
    `;
    return row;
  }

  function updateSkillsPreview() {
    if (!skillsList) return;
    skillsList.innerHTML = '';
    const rows = document.querySelectorAll('.skill-row');
    
    if (rows.length === 0) {
      // Show default skills
      const defaultSkills = ['Project Management', 'Public Speaking', 'Digital Marketing', 'Time Management', 'Leadership', 'Effective Communication', 'Critical Thinking'];
      defaultSkills.forEach(skill => {
        const li = document.createElement('li');
        li.textContent = skill;
        skillsList.appendChild(li);
      });
      return;
    }

    rows.forEach(row => {
      const skill = row.querySelector('input[name="skill"]').value.trim();
      if (skill) {
        const li = document.createElement('li');
        li.textContent = skill;
        li.classList.add('fade-in-up');
        skillsList.appendChild(li);
        setTimeout(() => li.classList.remove('fade-in-up'), 700);
      }
    });
  }

  // === LANGUAGES SECTION ===
  const languagesFieldset = Array.from(document.querySelectorAll('fieldset')).find(fs => 
    fs.querySelector('legend').textContent.includes('Languages'));
  const languagesList = document.querySelector('.languages-list');
  const addLanguageBtn = document.getElementById('add-language');

  function createLanguageRow() {
    const row = document.createElement('div');
    row.className = 'language-row';
    row.innerHTML = `
      <input type="text" name="language" placeholder="Language">
      <select name="proficiency">
        <option value="">Select Proficiency</option>
        <option value="Basics">Basics</option>
        <option value="Intermediate">Intermediate</option>
        <option value="Fluent">Fluent</option>
        <option value="Native">Native</option>
      </select>
      <button type="button" class="remove-language">Remove</button>
    `;
    return row;
  }

  function updateLanguagesPreview() {
    if (!languagesList) return;
    languagesList.innerHTML = '';
    const rows = document.querySelectorAll('.language-row');
    
    if (rows.length === 0) {
      // Show default languages
      const defaultLanguages = [
        { language: 'English', proficiency: 'Fluent' },
        { language: 'French', proficiency: 'Fluent' },
        { language: 'German', proficiency: 'Basics' },
        { language: 'Spanish', proficiency: 'Intermediate' }
      ];
      defaultLanguages.forEach(({ language, proficiency }) => {
        const li = document.createElement('li');
        li.textContent = `${language}: ${proficiency}`;
        languagesList.appendChild(li);
      });
      return;
    }

    rows.forEach(row => {
      const language = row.querySelector('input[name="language"]').value.trim();
      const proficiency = row.querySelector('select[name="proficiency"]').value;
      if (language && proficiency) {
        const li = document.createElement('li');
        li.textContent = `${language}: ${proficiency}`;
        li.classList.add('fade-in-up');
        languagesList.appendChild(li);
        setTimeout(() => li.classList.remove('fade-in-up'), 700);
      }
    });
  }

  // === EXPERIENCE SECTION ===
  const experienceFieldset = Array.from(document.querySelectorAll('fieldset')).find(fs => 
    fs.querySelector('legend').textContent.includes('Experience'));
  const experienceList = document.querySelector('.experience-list');
  const addExperienceBtn = document.getElementById('add-experience');

  function createExperienceRow() {
    const row = document.createElement('div');
    row.className = 'experience-row';
    row.innerHTML = `
      <input type="text" name="company" placeholder="Company">
      <input type="text" name="role" placeholder="Role">
      <input type="text" name="duration" placeholder="Duration">
      <textarea name="achievements" rows="3" placeholder="List your achievements (one per line)"></textarea>
      <button type="button" class="remove-experience">Remove</button>
    `;
    return row;
  }

  function createExperiencePreviewItem(company, role, duration, achievements) {
    const li = document.createElement('li');
    li.className = 'experience-item';
    
    const achievementsList = achievements ? achievements.split('\n').filter(a => a.trim()).map(a => `<li>${a.trim()}</li>`).join('') : '<li>Add your achievements here</li>';
    
    li.innerHTML = `
      <strong>${company || 'Company'} (${duration || 'Duration'})</strong><br>
      <em>${role || 'Role'}</em>
      <ul class="achievement-list">
        ${achievementsList}
      </ul>
    `;
    return li;
  }

  function updateExperiencePreview() {
    if (!experienceList) return;
    experienceList.innerHTML = '';
    const rows = document.querySelectorAll('.experience-row');
    
    if (rows.length === 0) {
      // Show default experience
      const li = document.createElement('li');
      li.className = 'experience-item';
      li.innerHTML = `
        <strong>Borcelle Studio (2030 - PRESENT)</strong><br>
        <em>Marketing Manager & Specialist</em>
        <ul class="achievement-list">
          <li>Led successful rebranding campaign resulting in 40% increase in brand recognition</li>
          <li>Managed team of 8 marketing professionals and coordinated cross-functional projects</li>
          <li>Developed and executed comprehensive digital marketing strategies across multiple platforms</li>
        </ul>
      `;
      experienceList.appendChild(li);
      
      const li2 = document.createElement('li');
      li2.className = 'experience-item';
      li2.innerHTML = `
        <strong>Forget Studio (2018 - 2020)</strong><br>
        <em>Marketing Manager & Specialist</em>
        <ul class="achievement-list">
          <li>Coordinated market research to identify emerging trends and consumer preferences</li>
          <li>Optimized online advertising campaigns, resulting in 25% increase in ROI</li>
          <li>Developed and implemented SEO strategies that improved website rankings by 35%</li>
        </ul>
      `;
      experienceList.appendChild(li2);
      
      const li3 = document.createElement('li');
      li3.className = 'experience-item';
      li3.innerHTML = `
        <strong>Studio Shadow (2021 - 2026)</strong><br>
        <em>Marketing Manager & Specialist</em>
        <ul class="achievement-list">
          <li>Developed and executed lead-generation marketing campaigns, resulting in 15,000 thousand leads per month</li>
          <li>Implemented SEO strategies that increased website visibility by 60%</li>
          <li>Analyzed performance metrics and user behavior data to optimize marketing campaigns and promotional materials</li>
        </ul>
      `;
      experienceList.appendChild(li3);
      return;
    }

    rows.forEach(row => {
      const company = row.querySelector('input[name="company"]').value;
      const role = row.querySelector('input[name="role"]').value;
      const duration = row.querySelector('input[name="duration"]').value;
      const achievements = row.querySelector('textarea[name="achievements"]').value;
      if (company || role || duration) {
        const li = createExperiencePreviewItem(company, role, duration, achievements);
        experienceList.appendChild(li);
        animatePreviewItem(li);
      }
    });
  }

  // === ANIMATION FUNCTIONS ===
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

  // === EVENT LISTENERS FOR DYNAMIC ROWS ===
  
  // Education
  if (addEducationBtn && educationFieldset) {
    addEducationBtn.addEventListener('click', function () {
      const newRow = createEducationRow();
      newRow.classList.add('fade-in-up');
      educationFieldset.insertBefore(newRow, addEducationBtn);
      
      newRow.querySelectorAll('input').forEach(input => {
        input.addEventListener('input', updateEducationPreview);
      });
      
      newRow.querySelector('.remove-education').addEventListener('click', function () {
        animateRemoveRow(newRow, updateEducationPreview);
      });
      
      setTimeout(() => newRow.classList.remove('fade-in-up'), 700);
      updateProgressBar();
    });

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

  // Skills
  if (addSkillBtn && skillsFieldset) {
    addSkillBtn.addEventListener('click', function () {
      const newRow = createSkillRow();
      newRow.classList.add('fade-in-up');
      skillsFieldset.insertBefore(newRow, addSkillBtn);
      
      newRow.querySelector('input').addEventListener('input', updateSkillsPreview);
      
      newRow.querySelector('.remove-skill-row').addEventListener('click', function () {
        animateRemoveRow(newRow, updateSkillsPreview);
      });
      
      setTimeout(() => newRow.classList.remove('fade-in-up'), 700);
      updateProgressBar();
    });

    document.querySelectorAll('.skill-row input').forEach(input => {
      input.addEventListener('input', updateSkillsPreview);
    });
    
    document.querySelectorAll('.skill-row .remove-skill-row').forEach(btn => {
      btn.addEventListener('click', function () {
        const row = btn.closest('.skill-row');
        animateRemoveRow(row, updateSkillsPreview);
      });
    });
    
    updateSkillsPreview();
  }

  // Languages
  if (addLanguageBtn && languagesFieldset) {
    addLanguageBtn.addEventListener('click', function () {
      const newRow = createLanguageRow();
      newRow.classList.add('fade-in-up');
      languagesFieldset.insertBefore(newRow, addLanguageBtn);
      
      newRow.querySelector('input').addEventListener('input', updateLanguagesPreview);
      newRow.querySelector('select').addEventListener('change', updateLanguagesPreview);
      
      newRow.querySelector('.remove-language').addEventListener('click', function () {
        animateRemoveRow(newRow, updateLanguagesPreview);
      });
      
      setTimeout(() => newRow.classList.remove('fade-in-up'), 700);
      updateProgressBar();
    });

    document.querySelectorAll('.language-row input').forEach(input => {
      input.addEventListener('input', updateLanguagesPreview);
    });
    
    document.querySelectorAll('.language-row select').forEach(select => {
      select.addEventListener('change', updateLanguagesPreview);
    });
    
    document.querySelectorAll('.language-row .remove-language').forEach(btn => {
      btn.addEventListener('click', function () {
        const row = btn.closest('.language-row');
        animateRemoveRow(row, updateLanguagesPreview);
      });
    });
    
    updateLanguagesPreview();
  }

  // Experience
  if (addExperienceBtn && experienceFieldset) {
    addExperienceBtn.addEventListener('click', function () {
      const newRow = createExperienceRow();
      newRow.classList.add('fade-in-up');
      experienceFieldset.insertBefore(newRow, addExperienceBtn);
      
      newRow.querySelectorAll('input, textarea').forEach(input => {
        input.addEventListener('input', updateExperiencePreview);
      });
      
      newRow.querySelector('.remove-experience').addEventListener('click', function () {
        animateRemoveRow(newRow, updateExperiencePreview);
      });
      
      setTimeout(() => newRow.classList.remove('fade-in-up'), 700);
      updateProgressBar();
    });

    document.querySelectorAll('.experience-row input, .experience-row textarea').forEach(input => {
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

  // === CLEAR FORM FUNCTIONALITY ===
  const clearFormBtn = document.getElementById('clear-form');
  const resumeForm = document.getElementById('resume-form');

  function clearFormAndPreview() {
    resumeForm.reset();

    // Reset preview to default values
    Object.keys(getDefaultValue('')).forEach(field => {
      const preview = document.querySelector('.preview-' + field.replace('_', '-'));
      if (preview) {
        preview.textContent = getDefaultValue(field);
      }
    });

    // Remove all but the first row from each section
    document.querySelectorAll('.education-row').forEach((row, idx) => {
      if (idx > 0) row.remove();
      else row.querySelectorAll('input').forEach(input => input.value = '');
    });
    
    document.querySelectorAll('.skill-row').forEach((row, idx) => {
      if (idx > 0) row.remove();
      else row.querySelectorAll('input').forEach(input => input.value = '');
    });
    
    document.querySelectorAll('.language-row').forEach((row, idx) => {
      if (idx > 0) row.remove();
      else {
        row.querySelectorAll('input').forEach(input => input.value = '');
        row.querySelectorAll('select').forEach(select => select.value = '');
      }
    });
    
    document.querySelectorAll('.experience-row').forEach((row, idx) => {
      if (idx > 0) row.remove();
      else {
        row.querySelectorAll('input, textarea').forEach(input => input.value = '');
      }
    });

    // Update all previews
    updateEducationPreview();
    updateSkillsPreview();
    updateLanguagesPreview();
    updateExperiencePreview();
    updateProgressBar();
  }

  if (clearFormBtn) {
    clearFormBtn.addEventListener('click', clearFormAndPreview);
  }

  // === DOWNLOAD PDF FUNCTIONALITY ===
  const downloadBtn = document.getElementById('download-pdf');
  const resumePreview = document.querySelector('.resume-preview');
  
  if (downloadBtn && resumePreview) {
    downloadBtn.addEventListener('click', function () {
      downloadBtn.textContent = 'Generating PDF...';
      downloadBtn.disabled = true;
      
      html2pdf().from(resumePreview).save('resume.pdf').then(() => {
        downloadBtn.textContent = 'Download PDF';
        downloadBtn.disabled = false;
      }).catch(() => {
        downloadBtn.textContent = 'Download PDF';
        downloadBtn.disabled = false;
        alert('Error generating PDF. Please try again.');
      });
    });
  }

  // === PROGRESS BAR FUNCTIONALITY ===
  const progressBar = document.getElementById('progress-bar');
  
  function getFormCompletionPercent() {
    let total = 0, filled = 0;
    
    // Basic text fields
    const textFields = ['name', 'title', 'email', 'phone', 'address', 'linkedin', 'summary'];
    textFields.forEach(id => {
      total++;
      const val = document.getElementById(id)?.value.trim();
      if (val) filled++;
    });
    
    // Education rows
    const eduRows = document.querySelectorAll('.education-row');
    eduRows.forEach(row => {
      total += 3; // degree, school, year (GPA is optional)
      if (row.querySelector('input[name="degree"]').value.trim()) filled++;
      if (row.querySelector('input[name="school"]').value.trim()) filled++;
      if (row.querySelector('input[name="year"]').value.trim()) filled++;
    });
    
    // Skill rows
    const skillRows = document.querySelectorAll('.skill-row');
    skillRows.forEach(row => {
      total++;
      if (row.querySelector('input[name="skill"]').value.trim()) filled++;
    });
    
    // Language rows
    const langRows = document.querySelectorAll('.language-row');
    langRows.forEach(row => {
      total += 2; // language and proficiency
      if (row.querySelector('input[name="language"]').value.trim()) filled++;
      if (row.querySelector('select[name="proficiency"]').value) filled++;
    });
    
    // Experience rows
    const expRows = document.querySelectorAll('.experience-row');
    expRows.forEach(row => {
      total += 3; // company, role, duration (achievements optional)
      if (row.querySelector('input[name="company"]').value.trim()) filled++;
      if (row.querySelector('input[name="role"]').value.trim()) filled++;
      if (row.querySelector('input[name="duration"]').value.trim()) filled++;
    });
    
    return total ? Math.round((filled / total) * 100) : 0;
  }

  function updateProgressBar() {
    const percent = getFormCompletionPercent();
    if (progressBar) {
      progressBar.style.width = percent + '%';
      progressBar.setAttribute('aria-valuenow', percent);
    }
  }

  // Listen to all form changes
  document.getElementById('resume-form').addEventListener('input', updateProgressBar);
  document.getElementById('resume-form').addEventListener('change', updateProgressBar);

  // Update on add/remove rows
  document.addEventListener('click', function(e) {
    if (e.target.classList.contains('remove-education') || 
        e.target.classList.contains('remove-experience') || 
        e.target.classList.contains('remove-skill-row') ||
        e.target.classList.contains('remove-language')) {
      setTimeout(updateProgressBar, 100);
    }
  });

  if (clearFormBtn) {
    clearFormBtn.addEventListener('click', function() {
      setTimeout(updateProgressBar, 100);
    });
  }

  // === INITIALIZE EVERYTHING ===
  updateProgressBar();
  
  // Add input event listeners to existing rows
  document.querySelectorAll('.education-row input, .experience-row input, .experience-row textarea, .skill-row input, .language-row input, .language-row select').forEach(input => {
    input.addEventListener('input', function() {
      if (input.closest('.education-row')) {
        updateEducationPreview();
      } else if (input.closest('.experience-row')) {
        updateExperiencePreview();
      } else if (input.closest('.skill-row')) {
        updateSkillsPreview();
      } else if (input.closest('.language-row')) {
        updateLanguagesPreview();
      }
      updateProgressBar();
    });
    
    if (input.tagName === 'SELECT') {
      input.addEventListener('change', function() {
        if (input.closest('.language-row')) {
          updateLanguagesPreview();
        }
        updateProgressBar();
      });
    }
  });
});
