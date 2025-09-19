import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast, Toaster } from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import {
  addPassword,
  subscribeToPasswords,
  updatePassword,
  deletePassword,
} from "../firebaseConfig";

const ManagePasswords = () => {
  const { currentUser } = useAuth();
  const [passwords, setPasswords] = useState([]);
  const [editingItem, setEditingItem] = useState(null); 
  const { register, handleSubmit, reset, setValue } = useForm();

  useEffect(() => {
    if (currentUser) {
      const unsubscribe = subscribeToPasswords(currentUser.uid, (data) => {
        setPasswords(data);
      });
      return () => unsubscribe();
    }
  }, [currentUser]);

  const onSubmit = async (data) => {
    if (!currentUser) {
      toast.error("You must be logged in to save passwords.");
      return;
    }
    try {
      if (editingItem) {
        await updatePassword(editingItem.id, {
          website: data.website,
          username: data.username,
          password: data.password,
        });
        toast.success("Password updated successfully!");
        setEditingItem(null); 
      } else {
        await addPassword(
          currentUser.uid,
          data.website,
          data.username,
          data.password
        );
        toast.success("Password saved successfully!");
      }
      reset(); 
    } catch (error) {
      console.error("Error submitting password:", error);
      toast.error("Failed to save or update password.");
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setValue("website", item.website);
    setValue("username", item.username);
    setValue("password", item.password);
  };

  const handleDelete = async (docId) => {
    if (window.confirm("Are you sure you want to delete this password?")) {
      try {
        await deletePassword(docId);
        toast.success("Password deleted successfully!");
      } catch (error) {
        console.error("Error deleting password:", error);
        toast.error("Failed to delete password.");
      }
    }
  };

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy text:", err);
      toast.error("Failed to copy.");
    }
  };

  return (
    <section className="text-gray-600 dark:bg-gray-900 body-font m flex flex-col items-center py-8 px-4 sm:px-6 lg:px-8">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="max-w-4xl w-full space-y-8 bg-white dark:bg-gray-800 p-8 rounded-xl shadow-[0px_50px_100px_-20px_rgba(50,50,93,0.25),0px_30px_60px_-30px_rgba(0,0,0,0.3),inset_0px_-2px_6px_0px_rgba(10,37,64,0.35)]">
        <h2 className="text-center text-3xl font-extrabold text-gray-900 dark:text-white ">
          Manage Your Passwords 🔑
        </h2>
        <div className="shadow-[0px_50px_100px_-20px_rgba(50,50,93,0.25),0px_30px_60px_-30px_rgba(0,0,0,0.3),inset_0px_-2px_6px_0px_rgba(10,37,64,0.35)] bg-gray-100 dark:bg-gray-700 p-6 rounded-lg">
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label
                htmlFor="website"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Website URL
              </label>
              <input
                id="website"
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500 dark:bg-gray-600 dark:border-gray-500 dark:text-white px-3 py-2"
                {...register("website", { required: true })}
                placeholder="https://www.example.com"
              />
            </div>
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Username/Email
              </label>
              <input
                id="username"
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500 dark:bg-gray-600 dark:border-gray-500 dark:text-white px-3 py-2"
                {...register("username", { required: true })}
                placeholder="john.doe@email.com"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500 dark:bg-gray-600 dark:border-gray-500 dark:text-white px-3 py-2"
                {...register("password", { required: true })}
                placeholder="********"
              />
            </div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
            >
              {editingItem ? "Update Password" : "Save Password"}
            </button>
            {editingItem && (
              <button
                type="button"
                onClick={() => {
                  setEditingItem(null);
                  reset();
                }}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-500 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
              >
                Cancel Edit
              </button>
            )}
          </form>
        </div>
        <div className="shadow-[0px_50px_100px_-20px_rgba(50,50,93,0.25),0px_30px_60px_-30px_rgba(0,0,0,0.3),inset_0px_-2px_6px_0px_rgba(10,37,64,0.35)] bg-white dark:bg-gray-800 p-6 rounded-lg ">
          <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
            Your Saved Passwords
          </h3>
          {passwords.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                    >
                      Website
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                    >
                      Username
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                    >
                      Password
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {passwords.map((item) => (
                    <tr key={item.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                        {item.website}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                        {item.username}
                        <button
                          onClick={() => copyToClipboard(item.username)}
                          className="ml-2 text-yellow-500 hover:text-yellow-600 focus:outline-none"
                        >
                          <svg
                            className="h-4 w-4 inline"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M16 12a2 2 0 01-2 2h-2a2 2 0 01-2-2m-2-2V7a2 2 0 012-2h2a2 2 0 012 2v3"
                            ></path>
                          </svg>
                        </button>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                        ••••••••
                        <button
                          onClick={() => copyToClipboard(item.password)}
                          className="ml-2 text-yellow-500 hover:text-yellow-600 focus:outline-none"
                        >
                          <svg
                            className="h-4 w-4 inline"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M16 12a2 2 0 01-2 2h-2a2 2 0 01-2-2m-2-2V7a2 2 0 012-2h2a2 2 0 012 2v3"
                            ></path>
                          </svg>
                        </button>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => handleEdit(item)}
                          className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-600 focus:outline-none"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="ml-4 text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-600 focus:outline-none"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-center text-gray-500 dark:text-gray-400">
              No passwords saved yet.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default ManagePasswords;
