import React, { useCallback , useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { Button, Input, RTE , Select } from "../index";
import { set, useForm, } from "react-hook-form";
import { useSelector } from "react-redux";
import appwriteService from "../../appwrite/config";

function PostForm({ post }) {
  const { register, handleSubmit, watch, control, setValue , getValues } = useForm({
    defaultValues: {
      title: post?.title || "",
      slug: post?.$id || "",
      content: post?.content || "",
      status: post?.status || "active",
    },
  });
  // console.log(post)
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  // console.log(userData)
  // const id = ID.unique()
  const submit = async (data) => {
    if (post) {
      const file = data.image[0] ? await appwriteService.fileUpload(data.image[0]) : null;
      if (file) {
        appwriteService.fileDelete(post.featuredImage);
      }
      const dbPost = await appwriteService.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined,
      });
      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
    } else {
      const file = await appwriteService.fileUpload(data.image[0]);
      console.log(file);
      if (file) {
        const fileId = file.$id;
        console.log(fileId)
        // console.log(userData)
        data.featuredImage = fileId;
        const dbPost = await appwriteService.createPost({
          ...data,
          userId: userData?.$id,
        });
        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      }
    }
  };

  const slugTransformation = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");
    return "";
  }, []);
  useEffect(()=>{
    const subcription = watch((value , {name})=>{
      if(name === 'title'){
        setValue('slug', slugTransformation(value.title,
          {shouldValidate: true}) )
      }
    })
    return()=>{
      subcription.unsubscribe()
    }
  },[watch, slugTransformation,setValue])



  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
    <div className="w-2/3 px-2">
      <Input
      label="Title :"
      placeholder="Title"
      className="mb-4" 
        {...register('title',{
          required:true
        })}
      />
      <Input
      label="Slug :"
      placeholder="Slug"
      className="mb-4"
      // disabled
      {...register('slug',{required:true})}
      onInput={(e)=>{
        setValue("slug", slugTransformation(e.currentTarget.value),{
        shouldValidate:true})
      }}
      />

      <RTE
      label="Content :"
      name="content"
      control={control}
      defaultValue={getValues("content")} />
    </div>
    <div className="w-1/3 px-2">
      <Input 
      label="Featured Image :"
      type="file"
      className="mb-4"
      accept="image/png, image/jpeg, image/jpg image/gif"
      {...register("image",{required: !post})}
      />
      {post && (
        <div className="w-full mb-4">
          <img src={appwriteService.getFilePreview(post.featuredImage)} alt={post.title}
          className="rounded-lg"  />
        </div>
      )}
      <Select 
      options={["active" , "inactive"]}
      label="Status"
      className="mb-4"
      {...register('status',{required:true})} />
      <Button 
      type="submit"
      className="w-full"
      bgColor={post ? "bg-green-500" : undefined}>{post ? "Update" : "Submit"}</Button>
    </div>
    </form>
  )
}

export default PostForm;
