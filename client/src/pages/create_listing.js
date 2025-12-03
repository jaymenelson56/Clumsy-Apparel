import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "@/styles/Home.module.css";

import {
    Card,
    CardBody,
    CardTitle,
    CardHeader,
    CardImg,
    FormGroup,
    Col,
    Spinner,
    Form,
    Label,
    Input,
    Button,
} from "reactstrap";
import Head from "next/head";
import { createOrder, getOrderById, updateOrder } from "@/pages/api/orderListData";

export default function OrderDetails() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        vinylType: "",
        shirtType: "",
        price: "",
        hoursLogged: "",
        amountOfErrors: "",
        neededHelp: "",
        rating: "",
        notes: "",
        fulfilled: ""
    });
    const [submitError, setSubmitError] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [imageURL, setImageURL] = useState("");


    useEffect(() => {
        return () => {
            if (imagePreview && imagePreview.startsWith('blob:')) {
                URL.revokeObjectURL(imagePreview);
            }
        };
    }, [imagePreview]);
   
    const handleChange = (e) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'select-one' && (name === 'neededHelp' || name === 'fulfilled')
                ? value === 'true'
                : value
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitError(null);
        try {
            const submitData = { ...formData };
            if (imageFile) {
                submitData.image = imageFile;
            } else if (imageURL) {
                submitData.imageURL = imageURL;
            }
            await createOrder(submitData);
            router.push("/orders");
        } catch (err) {
            console.error(err);
            setSubmitError("Failed to create order. Please try again.");
        }
    };

    return (
        <>
            <Head>
                <title>{formData.vinylType}Create Listing - Clumsy Apparel</title>
            </Head>
            <div className={styles.page}>
                <main className={styles.main}>
                    <Card className="card-custom my-2"
                        color="primary"
                        outline
                        style={{ borderWidth: '3px' }}
                    >
                        <CardHeader>
                            <CardTitle tag="h2">Create Listing</CardTitle>
                        </CardHeader>
                        <CardImg
                            top
                            src={imagePreview || "/image-not-found.png"}
                            alt={`${formData.vinylType} order`}
                            onError={(e) => {
                                e.currentTarget.src = "/image-not-found.png";
                            }}
                            style={{ maxHeight: '300px', objectFit: 'cover' }}
                        />
                        <CardBody>
                            <Form onSubmit={handleSubmit}>
                                <FormGroup>
                                    <Label for="imageInput">Upload New Image (optional):</Label>
                                    <Input
                                        id="imageInput"
                                        name="image"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="imageURLInput">Or enter image URL:</Label>
                                    <div className="d-flex gap-2">
                                        <Input
                                            id="imageURLInput"
                                            name="imageURL"
                                            type="text"
                                            value={imageURL}
                                            onChange={(e) => setImageURL(e.target.value)}
                                            placeholder={"type or paste in manually"}
                                        />
                                        <Button
                                            color="info"
                                            onClick={() => setImagePreview(imageURL)}
                                            disabled={!imageURL}
                                        >
                                            Preview
                                        </Button>
                                    </div>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="vinylInput">Vinyl Used:</Label>
                                    <Input
                                        id="vinylInput"
                                        name="vinylType"
                                        type="text"
                                        value={formData.vinylType}
                                        placeholder="Enter Vinyl Type"
                                        onChange={handleChange}
                                        required
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="shirtInput">Shirt Used:</Label>
                                    <Input
                                        id="shirtInput"
                                        name="shirtType"
                                        type="text"
                                        value={formData.shirtType}
                                        placeholder="Enter Shirt Type"
                                        onChange={handleChange}
                                        required
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="priceInput">Price:</Label>
                                    <Input
                                        id="priceInput"
                                        name="price"
                                        type="number"
                                        step="0.01"
                                        min="0"
                                        placeholder="Enter Price"
                                        value={formData.price}
                                        onChange={handleChange}
                                        required
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="hoursInput">Hours Worked:</Label>
                                    <Input
                                        id="hoursInput"
                                        name="hoursLogged"
                                        type="number"
                                        step="0.50"
                                        min="0"
                                        placeholder="Enter Hours"
                                        value={formData.hoursLogged}
                                        onChange={handleChange}
                                        required
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="errorInput">Number Of Errors:</Label>
                                    <Input
                                        id="errorInput"
                                        name="amountOfErrors"
                                        type="number"
                                        placeholder="Enter Error Number"
                                        min="0"
                                        value={formData.amountOfErrors}
                                        onChange={handleChange}
                                        required
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="helpInput">Help Needed:</Label>
                                    <Input
                                        id="helpInput"
                                        name="neededHelp"
                                        type="select"
                                        value={formData.neededHelp}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="" disabled hidden>Did You Get Help</option>
                                        <option value="true">Yes</option>
                                        <option value="false">No</option>
                                    </Input>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="ratingInput">Rating:</Label>
                                    <Input
                                        id="ratingInput"
                                        name="rating"
                                        type="select"
                                        value={formData.rating}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="" disabled hidden>Select a Rating</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                    </Input>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="notesInput">Notes:</Label>
                                    <Input
                                        id="notesInput"
                                        name="notes"
                                        type="textarea"
                                        placeholder="Enter Notes"
                                        value={formData.notes}
                                        onChange={handleChange}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="fulfilledInput">Is it fulfilled?</Label>
                                    <Input id="fulfilledInput"
                                        name="fulfilled"
                                        type="select"
                                        value={formData.fulfilled}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="" disabled hidden>Was it Fulfilled</option>
                                        <option value="true">Yes</option>
                                        <option value="false">No</option>
                                    </Input>
                                </FormGroup>
                                <div className="d-flex gap-2 mt-3">
                                    <Button color="primary" type="submit">Create</Button>
                                    <Button color="secondary" onClick={() => router.back()}>Cancel</Button>
                                </div>
                                {submitError && <div className="text-danger">{submitError}</div>}
                            </Form>
                        </CardBody>
                    </Card>
                </main>
            </div>
        </>
    );
}