import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';
import ContactLoding from './contactLoder';

const ContactUs = () => {
  const { axios } = useAppContext();

  const [mail, setMail] = useState({
    name: "",
    useremail: "",
    message: ""
  });

  const [loading, setLoading] = useState(false);

  const contactUs = async () => {
    try {
      const { data } = await axios.post('/api/contact', {
        name: mail.name,
        useremail: mail.useremail,
        message: mail.message,
      });

      if (data.success) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMail((prevmail) => ({ ...prevmail, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true); // Start loading

    setTimeout(async () => {
      await contactUs(); // Send email after 1 sec
      setMail({ name: "", useremail: "", message: "" }); // Reset form
      setLoading(false); // Stop loading
    }, 1000);
  };

  // Show loader while loading
  if (loading) return <ContactLoding />;

  return (
    <div className="min-h-screen  flex items-center justify-center px-4">
      <div className="max-w-2xl w-full bg-white p-8 rounded-2xl shadow-2xl">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Contact Us</h2>
        <p className="text-center text-gray-500 mb-8">We’d love to hear from you! Fill out the form below.</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-700 mb-1">Name</label>
            <input
              type="text"
              placeholder="Your Name"
              className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-primary outline-none"
              onChange={handleChange}
              name='name'
              value={mail.name}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              name='useremail'
              className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-primary outline-none"
              onChange={handleChange}
              value={mail.useremail}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Message</label>
            <textarea
              rows="4"
              placeholder="Type your message..."
              className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-primary outline-none resize-none"
              name='message'
              onChange={handleChange}
              value={mail.message}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-primary hover:bg-primary-dull text-white py-2 rounded-xl transition duration-300 cursor-pointer"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
