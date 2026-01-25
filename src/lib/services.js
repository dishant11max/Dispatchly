import { supabase } from "./supabase";

/**
 * Quote Request Services
 */
export const quoteService = {
  // Submit a new quote request
  async submitQuote(quoteData) {
    const { data, error } = await supabase
      .from("quotes")
      .insert([
        {
          pickup_city: quoteData.pickupCity,
          pickup_address: quoteData.pickupAddress,
          delivery_city: quoteData.deliveryCity,
          delivery_address: quoteData.deliveryAddress,
          cargo_type: quoteData.cargoType,
          weight: quoteData.weight,
          vehicle_type: quoteData.vehicleType,
          special_instructions: quoteData.specialInstructions,
          customer_name: quoteData.name,
          customer_phone: quoteData.phone,
          customer_email: quoteData.email,
          preferred_date: quoteData.preferredDate,
          status: "pending",
        },
      ])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Get all quotes (for admin)
  async getQuotes() {
    const { data, error } = await supabase
      .from("quotes")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  },

  // Update quote status
  async updateQuoteStatus(id, status) {
    const { data, error } = await supabase
      .from("quotes")
      .update({ status })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },
};

/**
 * Contact Form Services
 */
export const contactService = {
  // Submit a contact message
  async submitContact(contactData) {
    const { data, error } = await supabase
      .from("contacts")
      .insert([
        {
          name: contactData.name,
          email: contactData.email,
          phone: contactData.phone,
          subject: contactData.subject,
          message: contactData.message,
          status: "unread",
        },
      ])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Get all contacts (for admin)
  async getContacts() {
    const { data, error } = await supabase
      .from("contacts")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  },
};

/**
 * Driver Services
 */
export const driverService = {
  // Request OTP
  async requestOTP(phone) {
    // This would integrate with Supabase Auth phone or a custom OTP service
    // For now, we'll use Supabase Auth with phone
    const { data, error } = await supabase.auth.signInWithOtp({
      phone: `+91${phone}`,
    });

    if (error) throw error;
    return data;
  },

  // Verify OTP
  async verifyOTP(phone, token) {
    const { data, error } = await supabase.auth.verifyOtp({
      phone: `+91${phone}`,
      token,
      type: "sms",
    });

    if (error) throw error;
    return data;
  },

  // Get driver profile
  async getDriverProfile(userId) {
    const { data, error } = await supabase
      .from("drivers")
      .select("*")
      .eq("user_id", userId)
      .single();

    if (error && error.code !== "PGRST116") throw error; // PGRST116 = not found
    return data;
  },

  // Create/Update driver profile
  async upsertDriverProfile(userId, profileData) {
    const { data, error } = await supabase
      .from("drivers")
      .upsert({
        user_id: userId,
        name: profileData.name,
        phone: profileData.phone,
        email: profileData.email,
        aadhar_number: profileData.aadharNumber,
        license_number: profileData.licenseNumber,
        vehicle_number: profileData.vehicleNumber,
        vehicle_type: profileData.vehicleType,
        bank_account: profileData.bankAccount,
        ifsc_code: profileData.ifscCode,
        status: "pending_verification",
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },
};
