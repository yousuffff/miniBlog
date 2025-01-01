import React from "react";
import appwriteService from "../appwrite/config";
import { Link } from "react-router-dom";

function PostCard({ $id, title, featuredImage }) {
  // console.log(title , featuredImage,$id);
  return (
    <Link to={`/post/${$id}`}>
      <div className="p-4 rounded-xl bg-gray-100 w-full border-2 border-black hover:shadow-2xl shadow-slate-700 transition duration-300 hover:scale-105">
        <div className="w-full justify-center mb-4 h-48 flex pb-1 border-b-2 border-black">
          <img
            src={appwriteService.getFilePreview(featuredImage)}
            alt={title}
            className="rounded-xl object-cover border border-gray-400 "
          />
        </div>
        <h2 className="text-xl font-bond font-mono">{title.toUpperCase()}</h2>
      </div>
    </Link>
  );
}

export default PostCard;
