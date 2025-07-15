import axios from '../../AxiosInstances/axiosInstance';
import React, { useEffect, useState } from 'react'
import Select from 'react-select';

import { useParams } from 'react-router-dom';
import { MdCancel } from "react-icons/md";
import { IoClose } from 'react-icons/io5';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
export default function AddProject() {
    // let [BackendImage, setBackendImage] = useState('');
    let params = useParams();
    let [render, setrender] = useState(false)
    let [tech, settech] = useState([]);
    let [selectedTech, setselectedTech] = useState([])
    const [featureInput, setFeatureInput] = useState('');
    const [features, setFeatures] = useState([]);
    const [blocks, setBlocks] = useState([
        { image: null, backendImage: null, order: "" }
    ]);
    let [baseurl, setbaseurl] = useState('')
    const [paraInput, setParaInput] = useState('');
    const [paragraphs, setParagraphs] = useState([]);
    let [projectdetail, setprojectdetail] = useState('')


    useEffect(() => {
        if (params.id != undefined) {
            axios.post(`api/admin/project/detail`, { id: params.id }).then((response) => {
                if (response.data.tokenstatus != false) {
                    setprojectdetail(response.data.data)
                    setbaseurl(response.data.base_url)
                    setFeatures(response.data.data.features)

                    setParagraphs(response.data.data.paragraphs)
                    setselectedTech((response.data.data.tech_stack.length > 0) ?
                        response.data.data.tech_stack.map((v, i) => {
                            return ({
                                value: v._id,
                                label: v.name

                            })
                        }) : []
                    )
                    setBlocks([...response.data.data.images, { image: null, backendImage: null, order: "" }])


                } else {
                    toast.error(response.data.message)
                }
            })
                .catch((error) => {
                    toast.error('something went wrong')
                })
        } else {
            setprojectdetail('')
            setBlocks([
                { image: null, backendImage: null, order: "" }
            ])
            setselectedTech([])
            setFeatures([])
            setParagraphs([])
        }
    }, [params, render])

    useEffect(() => {
        axios.post('api/admin/skills/view', {})
            .then((response) => {
                if(response.data.status===true){
                    
                settech(response.data.data)
                }else{
                        toast.error(response.data.message)
                }


            }).catch((error) => {
                console.log(error.message)
            })
    }, [])
    let Tech = []
    tech.map((v, i) => {
        let obj = {
            value: v._id,
            label: v.name
        }
        Tech.push(obj)
    })

    let techhandle = (event) => {
        setselectedTech(event)
    }


    const handleAddParagraph = () => {
        const trimmed = paraInput.trim();
        if (trimmed !== '') {
            setParagraphs([...paragraphs, trimmed]);
            setParaInput('');
        }
    };

    const handleRemoveParagraph = (indexToRemove) => {
        const updated = paragraphs.filter((_, index) => index !== indexToRemove);
        setParagraphs(updated);
    };

    const addFeature = () => {
        const trimmed = featureInput.trim();
        if (trimmed) {
            setFeatures([...features, trimmed]);
            setFeatureInput('');
        }
    };

    const removeFeature = (index) => {
        const newList = [...features];
        newList.splice(index, 1);
        setFeatures(newList);
    };




    let formhandler = (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);

        const oldImages = []; // store existing images for update
        blocks.forEach((block) => {
            if (block.imageFile) {
                formData.append("images", block.imageFile); // new uploads
                formData.append("orders", block.order);
            } else if (block.image) {
                // Existing image, send its name + order
                oldImages.push({ image: block.image, order: block.order });
            }
        });


        // JSON Fields
        formData.append("features", JSON.stringify(features));
        formData.append("paragraphs", JSON.stringify(paragraphs));
        if (params.id) {
            formData.append("old_images", JSON.stringify(oldImages));
        }
        const url = params.id
            ? `api/admin/project/update/${params.id}`
            : `api/admin/project/insert`;
        // formData.append("tech_stack", JSON.stringify(selectedTech.map(item => item.value)));

        axios.post(url, formData)
            .then((response) => {
                if (response.data.status === true) {
                    if (params.id) {
                        setrender(!render)
                    } else {
                        e.target.reset();
                        setBlocks([
                            { image: null, backendImage: null, order: "" }
                        ])
                        setselectedTech([])
                        setFeatures([])
                        setParagraphs([])
                    }
                    toast.success(params.id ? "Project updated!" : "Project added!");
                } else {
                    toast.error(response.data.message)
                }
                toast.success(params.id ? "Project updated!" : "Project added!");
            })
            .catch((error) => {
                console.error("❌ Error:", error);
                toast.error("Something went wrong!");
            });
    }


    const handleImageChange = (e, index) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const updatedBlocks = [...blocks];
                updatedBlocks[index].image = reader.result;
                updatedBlocks[index].imageFile = file;
                setBlocks(updatedBlocks);

                if (index === blocks.length - 1) {
                    setBlocks([...updatedBlocks, { image: null, imageFile: null, order: "" }]);
                }
            };
            reader.readAsDataURL(file);
        }
    };






    const handleOrderChange = (e, index) => {
        const updatedBlocks = [...blocks];
        updatedBlocks[index].order = e.target.value;
        setBlocks(updatedBlocks);
    };

    const handleImageDelete = async (imageName) => {


        // setBlocks([ { image: null, backendImage: null, order: "" }])
        Swal.fire({
            title: 'Are you sure?',
            text: 'You want to delete these records? (They will be permanently deleted)',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete',
            cancelButtonText: 'Cancel',
        }).then((result) => {
            if (result.isConfirmed) {
                axios.post('api/admin/project/delete-image', { id: params.id, imagename: imageName })
                    .then((response) => {
                        if (response.data.status === true) {
                            toast.success('image deleted successfully ')
                            setrender(!render)
                        } else {
                            toast.error(response.data.message)
                        }
                    }).catch((error) => {
                        toast.error('hello', error.message)
                    })
            } else {
                toast.info("Deletion cancelled");
            }

        })
    }

    const handleRemoveBlock = (indexToRemove) => {
        const updatedBlocks = blocks.filter((_, i) => i !== indexToRemove);
        setBlocks(updatedBlocks);
    };




    return (
        <section class="w-full">
            <nav class="flex border-b-2" aria-label="Breadcrumb">
                <ol class="p-3 px-6 inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                    <li class="inline-flex items-center"><a href="#" class="inline-flex items-center text-md font-medium text-gray-700 hover:text-blue-600">Home</a></li>
                    <li>
                        <div class="flex items-center">/<a href="#" class="ms-1 text-md font-medium text-gray-700 hover:text-blue-600 md:ms-2"></a>Project</div>
                    </li>
                    <li aria-current="page">
                        <div class="flex items-center">/<span class="ms-1 text-md font-medium text-gray-500 md:ms-2">
                            {
                                (params.id != null)
                                    ?
                                    'Update '
                                    :

                                    'Add '
                            }
                        </span></div>
                    </li>
                </ol>
            </nav>
            <div class="w-full min-h-[610px]">
                <div class="max-w-[1220px] mx-auto py-5">
                    <h3 class="text-[26px] font-semibold bg-slate-100 py-3 px-4 rounded-t-md border border-slate-400">
                        {
                            (params.id != null)
                                ?
                                'Update Project'
                                :
                                'Add Project'
                        } </h3>
                    <form
                        onSubmit={formhandler}
                        class="border   justify-between border-t-0 p-3 rounded-b-md border-slate-400">
                        <div class="mb-5">
                            <label for="base-input" class="block mb-5 	text-base font-medium text-gray-900">Name</label>
                            <input
                                name="name"
                                type="text"
                                defaultValue={projectdetail.name}
                                id="base-input"
                                class="text-base border-2 shadow-sm border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-3"
                                placeholder="Enter your name"
                            />
                        </div>

                        <div className='flex  gap-5'>
                            <div class="mb-5 basis-[50%]">
                                <label for="base-input" class="block mb-5 	text-base font-medium text-gray-900">Project Link</label>
                                <input
                                    name="link"
                                    type="text"
                                    defaultValue={projectdetail.link}
                                    id="base-input"
                                    class="text-base border-2 shadow-sm border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-3"
                                    placeholder="Enter your name"
                                />
                            </div>
                            <div class="mb-5 basis-[50%]">
                                <label for="base-input" class="block mb-5 	text-base font-medium text-gray-900">Github Link</label>
                                <input
                                    name="github_link"
                                    type="text"
                                    defaultValue={projectdetail.github_link}
                                    id="base-input"
                                    class="text-base border-2 shadow-sm border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-3"
                                    placeholder="Enter your name"
                                />
                            </div>
                        </div>
                        <div className='flex  gap-5'>
                            <div class="mb-5 basis-[50%]">
                                <label for="base-input" class="block mb-5 text-md font-medium text-gray-900">Select Project Type</label>
                                <select id="default" name="project_type" class="border-2 border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3">
                                    <option value={''}>--Select Project Type--</option>
                                    <option selected={
                                        (projectdetail.project_type === 'frontend')
                                            ? 'selected' : ''
                                    } value={'frontend'}>Frontend</option>
                                    <option selected={
                                        (projectdetail.project_type === 'fullstack')
                                            ? 'selected' : ''
                                    } value={'fullstack'}> Full stack</option>
                                </select>
                            </div>
                            <div class="mb-5 basis-[50%]">
                                <label class="block mb-5 text-md font-medium text-gray-900"> Select Technologies</label>

                                <Select options={Tech}
                                    onChange={techhandle}
                                    value={selectedTech}
                                    name="tech_stack" isMulti />
                            </div>
                        </div>


                        <div className="mb-5">
                            <label htmlFor="base-input" className="block mb-5 text-base font-medium text-gray-900">
                                Short Description
                            </label>
                            <textarea
                                name="short_description"
                                id="base-input"
                                defaultValue={projectdetail.short_description}
                                className="text-base border-2 shadow-sm border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-3"
                                placeholder="Enter a short description"
                                rows={4}
                            ></textarea>
                        </div>
                        <div className="mb-5">
                            <label htmlFor="base-input" className="block mb-5 text-base font-medium text-gray-900">
                                Long Description
                            </label>
                            <textarea
                                name="long_description"
                                id="base-input"
                                defaultValue={projectdetail.long_description}
                                className="text-base border-2 shadow-sm border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-3"
                                placeholder="Enter a short description"
                                rows={4}
                            ></textarea>
                        </div>




                        <label htmlFor="base-input" className="block mb-5 text-base font-medium text-gray-900">
                            Images
                        </label>
                        <div className="flex flex-wrap gap-5">
                            {blocks.map((block, index) => (
                                <div key={index} className="mb-6 relative">
                                    {blocks.length > 1 && index !== blocks.length - 1 && (


                                        <button
                                            type="button"
                                            onClick={() => handleRemoveBlock(index)}
                                            className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-1 rounded-full"
                                            title="Remove image block"
                                        >
                                            ✕
                                        </button>
                                    )}

                                    {params.id != undefined && blocks.length > 1 && index !== blocks.length - 1 && (
                                        <button
                                            type="button"
                                            onClick={() => handleImageDelete(block.image)}
                                            className="absolute top-2 left-2 bg-red-500 hover:bg-red-600 text-white p-1 rounded-full text-sm"
                                            title="Delete image"
                                        >
                                            🗑
                                        </button>
                                    )}


                                    <input
                                        type="file"
                                        id={`image-${index}`}
                                        className="hidden"
                                        onChange={(e) => handleImageChange(e, index)}
                                    />

                                    <label
                                        htmlFor={`image-${index}`}
                                        className="cursor-pointer block w-full h-60 border-2 border-dashed border-gray-400 rounded-md flex items-center justify-center bg-gray-50 hover:bg-gray-100"
                                    >
                                        {block.image ? (
                                            <img
                                                src={
                                                    typeof block.image === 'string' && !block.image.startsWith('data:')
                                                        ? `${baseurl}/${block.image}`
                                                        : block.image
                                                }
                                                alt="Selected"
                                                className="object-cover h-full w-full rounded-md"
                                            />
                                        ) : (
                                            <div className="text-center text-gray-500">
                                                <p>Click or drag image here</p>
                                                <p className="text-sm">PNG, JPG, SVG (Max 800x400px)</p>
                                            </div>
                                        )}
                                    </label>


                                    <input
                                        type="number"
                                        name={`images[${index}][order]`}
                                        placeholder="Order"
                                        value={block.order}
                                        onChange={(e) => handleOrderChange(e, index)}
                                        className="mt-2 w-full border px-3 py-2 rounded-md"
                                    />
                                </div>
                            ))}



                        </div>
                        <div className="flex flex-col md:flex-row gap-5">
                            {/* Left: Input */}
                            <div className="mb-5 basis-full md:basis-1/2">
                                <label htmlFor="feature-input" className="block mb-3 text-base font-medium text-gray-900">
                                    Add Features
                                </label>
                                <input
                                    id="feature-input"
                                    type="text"
                                    value={featureInput}
                                    onChange={(e) => setFeatureInput(e.target.value)}
                                    className="text-base border-2 shadow-sm border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-3 mb-3"
                                    placeholder="Write a feature (e.g. Dark Mode)"
                                />
                                <button
                                    onClick={addFeature}
                                    type="button"
                                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                                >
                                    Add Feature
                                </button>
                            </div>

                            {/* Right: Features List */}
                            <div className="mb-5 basis-full md:basis-1/2">
                                <h2 className="mb-3 text-base font-medium text-gray-900">Features List</h2>
                                <div className="flex flex-col gap-3">
                                    {features.length === 0 ? (
                                        <p className="text-gray-500 italic">No features added yet.</p>
                                    ) : (
                                        features.map((feature, index) => (
                                            <div key={index} className="relative bg-gray-100 border border-gray-300 rounded-lg px-4 py-2 pr-10">
                                                {feature}
                                                <button
                                                    onClick={() => removeFeature(index)}
                                                    className="absolute top-1 right-1 text-red-600 hover:text-red-800"
                                                >
                                                    <MdCancel size={20} />
                                                </button>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="mb-5">
                            {/* Label & Textarea */}
                            <label htmlFor="para-input" className="block mb-3 text-base font-medium text-gray-900">
                                Add Paragraph
                            </label>
                            <textarea
                                id="para-input"
                                name="paragraph"
                                value={paraInput}
                                onChange={(e) => setParaInput(e.target.value)}
                                placeholder="Type a paragraph and click Add"
                                rows={4}
                                className="text-base border-2 shadow-sm border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-3 mb-3"
                            ></textarea>
                            <button
                                type="button"
                                onClick={handleAddParagraph}
                                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
                            >
                                Add Paragraph
                            </button>

                            {/* Paragraph List */}
                            <div className="mt-6 flex flex-col gap-4">
                                {paragraphs.length === 0 && (
                                    <p className="text-gray-500">No paragraphs added yet.</p>
                                )}
                                {paragraphs.map((para, index) => (
                                    <div
                                        key={index}
                                        className="relative bg-gray-100 border border-gray-300 rounded-lg px-4 py-3 shadow-sm"
                                    >
                                        <p className="text-gray-800">{para}</p>
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveParagraph(index)}
                                            className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                                        >
                                            <IoClose size={18} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>


                        <div class="mb-5">
                            <label for="base-input" class="block mb-5 	text-base font-medium text-gray-900">Order</label>
                            <input
                                name="order"
                                type="text"
                                defaultValue={projectdetail.order}
                                id="base-input"
                                class="text-base border-2 shadow-sm border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-3"
                                placeholder="Enter your name"
                            />
                        </div>



                        <button
                            type="submit"
                            class="focus:outline-none my-10 text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </section>
    )
}
