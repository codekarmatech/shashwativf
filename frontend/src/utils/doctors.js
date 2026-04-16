const DOCTOR_PREFIX_TARGETS = new Set(['Shital Punjabi', 'Rajesh Punjabi']);

const normalizeDoctorName = (name = '') =>
  name
    .trim()
    .replace(/^Dr\.?\s*/i, '')
    .replace(/\s+/g, ' ');

export const formatDoctorName = (name = '') => {
  const trimmedName = name.trim();
  const normalizedName = normalizeDoctorName(trimmedName);

  if (!trimmedName) {
    return '';
  }

  if (/^Dr\.?/i.test(trimmedName)) {
    return `Dr. ${normalizedName}`;
  }

  if (DOCTOR_PREFIX_TARGETS.has(normalizedName)) {
    return `Dr. ${normalizedName}`;
  }

  return normalizedName;
};

export const enrichDoctorProfile = (doctor = {}) => {
  const formattedName = formatDoctorName(doctor.name);
  const normalizedName = normalizeDoctorName(doctor.name);

  if (normalizedName === 'Shital Punjabi') {
    return {
      ...doctor,
      name: formattedName,
      profileLabel: 'Senior IVF Specialist',
      qualifications: 'M.D., D.G.O. (Gold in D.G.O. + M.D.), FICOG, ART Specialist (USA)',
      experience: '30+ years',
      highlights: [
        'Gold in D.G.O. + M.D.',
        'FICOG Certified',
        'ART Specialist Training (USA)',
        'International Faculty',
        'National & International Conference Speaker',
      ],
      bio: 'Dr. Shital Punjabi is the face of Shashwat IVF & Women\'s Hospital, bringing 30+ years of expertise in fertility treatments and vaginal cosmetic surgery. Her academic excellence and international training make her a leading authority in reproductive medicine.',
      procedureCount: '5000+',
      yearsCount: '30+',
    };
  }

  if (normalizedName === 'Rajesh Punjabi') {
    return {
      ...doctor,
      name: formattedName,
      experience: '30+ years',
      bio: 'Dr. Rajesh Punjabi combines advanced surgical expertise with fertility treatments, specializing in minimally invasive procedures that enhance reproductive outcomes.',
      procedureCount: '5000+',
      yearsCount: '30+',
    };
  }

  return {
    ...doctor,
    name: formattedName,
  };
};
