const compact = (values) => values.filter(Boolean);
const joinWithComma = (values) => compact(values).join(', ');

export const normalizeClinicInfo = (apiClinicInfo, fallback = {}) => {
  const source = apiClinicInfo || {};
  const fallbackContact = fallback.contact || {};
  const fallbackAddress = fallbackContact.address || {};
  const fallbackPhone = fallbackContact.phone || {};
  const fallbackEmail = fallbackContact.email || {};
  const fallbackHours = fallbackContact.hours || {};
  const fallbackMetrics = fallback.metrics || {};
  const fallbackSocialMedia = fallback.socialMedia || {};

  const address = {
    line1: source.address_line1 || fallbackAddress.street || '',
    line2: source.address_line2 || fallbackAddress.area || '',
    city: source.city || fallbackAddress.city || '',
    state: source.state || fallbackAddress.state || '',
    pincode: source.pincode || fallbackAddress.pincode || '',
    country: source.country || fallbackAddress.country || '',
  };

  const cityState = joinWithComma([address.city, address.state]);
  const postalLine = compact([cityState, address.pincode]).join(address.pincode && cityState ? ' - ' : '');
  const fullAddress = joinWithComma([address.line1, address.line2, postalLine, address.country]);

  return {
    name: source.name || fallback.name,
    tagline: source.tagline || fallback.tagline,
    description: source.description || fallback.description,
    contact: {
      address: {
        ...fallbackAddress,
        ...address,
        full: fullAddress || fallbackAddress.full || '',
      },
      phone: {
        frontDesk: source.front_desk_phone || fallbackPhone.frontDesk || '',
        appointments: source.appointments_phone || fallbackPhone.appointments || '',
        emergency: source.emergency_phone || fallbackPhone.emergency || '',
      },
      email: {
        general: source.general_email || fallbackEmail.general || '',
        appointments: source.appointments_email || fallbackEmail.appointments || '',
      },
      hours: {
        weekdays: source.weekday_hours || fallbackHours.weekdays || '',
        saturday: source.saturday_hours || fallbackHours.saturday || '',
        sunday: source.sunday_hours || fallbackHours.sunday || '',
      },
    },
    metrics: {
      ...fallbackMetrics,
      townsReached: source.towns_reached || fallbackMetrics.townsReached || '',
      livesImpacted: source.lives_impacted || fallbackMetrics.livesImpacted || '',
      yearsExperience: source.years_experience || fallbackMetrics.yearsExperience || '',
      successRate: source.success_rate || fallbackMetrics.successRate || '',
    },
    socialMedia: {
      facebook: source.facebook_url || fallbackSocialMedia.facebook || '',
      instagram: source.instagram_url || fallbackSocialMedia.instagram || '',
      youtube: source.youtube_url || fallbackSocialMedia.youtube || '',
      linkedin: source.linkedin_url || fallbackSocialMedia.linkedin || '',
    },
  };
};
