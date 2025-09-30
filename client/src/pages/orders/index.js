import Head from "next/head";
import styles from "@/styles/Home.module.css";
import {
    Card,
    CardBody,
    CardTitle,
    CardFooter,
    Form,
    FormGroup,
    Label,
    Input,
    Row,
    Col,
    Button,
    Collapse
} from "reactstrap";
import { useEffect, useState } from "react";
import { getOrders } from "../api/orderListData";



export default function OrderList() {
    const [isOpen, setIsOpen] = useState(false);
    const [orders, setOrders] = useState([])
    const [filters, setFilters] = useState({
        vinyl: "",
        shirt: "",
        neededHelp: "",
        fulfilled: "",
        minPrice: "",
        maxPrice: "",
        minHours: "",
        maxHours: "",
        rating: "",
    });

    const toggle = () => setIsOpen(!isOpen);

    useEffect(() => {
        async function loadOrders() {
            try {
                const result = await getOrders();
                setOrders(result.data);
            } catch (err) {
                console.error(err);
            }
        }
        loadOrders();
    }, []);
    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters((prev) => ({ ...prev, [name]: value }));
    };

    const applyFilters = async () => {
        try {
            const result = await getOrders(filters);
            setOrders(result.data);
        } catch (err) {
            console.error(err);
        }
    };
    return (
        <>
            <Head>
                <title>Clumsy Apparel</title>
                <meta name="description" content="Welcome to Clumsy Apparel" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className={`${styles.page}`}>
                <main className={styles.main}>
                    <Card className="card-custom">
                        <CardBody>
                            <CardTitle tag="h1" className="text-center">Order List</CardTitle>
                            <Collapse isOpen={isOpen}>
                                <Form>
                                    <Row>
                                        <Col xs={12} md={6}>
                                            <FormGroup>
                                                <Label for="vinylFilter">Vinyl</Label>
                                                <Input
                                                    id="vinylFilter"
                                                    name="vinyl"
                                                    type="text"
                                                    placeholder="Filter by vinyl type"
                                                    value={filters.vinyl}
                                                    onChange={handleFilterChange}
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col xs={12} md={6}>
                                            <FormGroup>
                                                <Label for="shirtFilter">Shirt</Label>
                                                <Input
                                                    id="shirtFilter"
                                                    name="shirt"
                                                    type="text"
                                                    placeholder="Filter by shirt type"
                                                    value={filters.shirt}
                                                    onChange={handleFilterChange}
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col xs={12} md={6}>
                                            <FormGroup>
                                                <Label for="neededHelp">Help Needed</Label>
                                                <Input
                                                    id="neededHelp"
                                                    name="neededHelp"
                                                    type="select"
                                                    value={filters.neededHelp}
                                                    onChange={handleFilterChange}
                                                >
                                                    <option value="">Does not matter</option>
                                                    <option value="yes">Yes</option>
                                                    <option value="no">No</option>
                                                </Input>
                                            </FormGroup>
                                        </Col>
                                        <Col xs={12} md={6}>
                                            <FormGroup>
                                                <Label for="fulfilled">Is it fulfilled?</Label>
                                                <Input id="fulfilled"
                                                    name="fulfilled"
                                                    type="select"
                                                    value={filters.fulfilled}
                                                    onChange={handleFilterChange}
                                                >
                                                    <option value="">Does not matter</option>
                                                    <option value="yes">Yes</option>
                                                    <option value="no">No</option>
                                                </Input>
                                            </FormGroup>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col xs={12} md={6}>
                                            <FormGroup>
                                                <Label for="minPrice">Minimum Price</Label>
                                                <Input
                                                    id="minPrice"
                                                    name="minPrice"
                                                    type="number"
                                                    step="0.01"
                                                    placeholder="Enter minimum price"
                                                    value={filters.minPrice}
                                                    onChange={handleFilterChange}
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col xs={12} md={6}>
                                            <FormGroup>
                                                <Label for="maxPrice">Maximum Price</Label>
                                                <Input
                                                    id="maxPrice"
                                                    name="maxPrice"
                                                    type="number"
                                                    step="0.01"
                                                    placeholder="Enter maximum price"
                                                    value={filters.maxPrice}
                                                    onChange={handleFilterChange}
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={12} md={4}>
                                            <FormGroup>
                                                <Label for="minHours">Minimum Hours</Label>
                                                <Input
                                                    id="minHours"
                                                    name="minHours"
                                                    type="number"
                                                    step="0.01"
                                                    placeholder="Enter minimum hours"
                                                    value={filters.minHours}
                                                    onChange={handleFilterChange}
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col xs={12} md={4}>
                                            <FormGroup>
                                                <Label for="maxHours">Maximum Hours</Label>
                                                <Input
                                                    id="maxHours"
                                                    name="maxHours"
                                                    type="number"
                                                    step="0.01"
                                                    placeholder="Enter maximum hours"
                                                    value={filters.maxHours}
                                                    onChange={handleFilterChange}
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col xs={12} md={4}>
                                            <FormGroup>
                                                <Label for="rating">Rating</Label>
                                                <Input
                                                    id="rating"
                                                    name="rating"
                                                    type="select"
                                                    value={filters.rating}
                                                    onChange={handleFilterChange}
                                                >
                                                    <option value="">Does not matter</option>
                                                    <option value="1">1</option>
                                                    <option value="2">2</option>
                                                    <option value="3">3</option>
                                                    <option value="4">4</option>
                                                    <option value="5">5</option>
                                                </Input>
                                            </FormGroup>
                                            <Button
                                                color="primary"
                                                className="w-100 w-md-auto"
                                                onClick={applyFilters}
                                                type="button"
                                            >
                                                Apply Filters
                                            </Button>
                                        </Col>
                                    </Row>
                                </Form>
                            </Collapse>
                            <div className="d-flex justify-content-center mt-3">
                                <Button color="secondary" onClick={toggle} className="mb3">
                                    {isOpen ? "Hide Filters" : "Filters"}
                                </Button>
                            </div>
                            <Row>
                                {orders.length === 0 ? (
                                    <Col>
                                        <p className="text-center mt-3">No orders found</p>
                                    </Col>
                                ) : (
                                    orders.map((order) => (
                                        <Col xs={12} sm={6} md={4} key={order.Id} className="mb-4">
                                            <Card>
                                                <CardBody>
                                                    <CardTitle tag="h5">Order #{order.id}</CardTitle>
                                                    <p><strong>Vinyl:</strong> {order.vinylType}</p>
                                                    <p><strong>Shirt:</strong> {order.shirtType}</p>
                                                    <p>
                                                        <strong>Fulfilled:</strong>{" "}
                                                        {order.fulfilled ? "Yes" : "No"}
                                                    </p>
                                                </CardBody>
                                                <CardFooter>
                                                    Rating: {order.rating}
                                                </CardFooter>
                                            </Card>
                                        </Col>
                                    )))}
                            </Row>
                        </CardBody>
                    </Card>
                </main>
            </div>
        </>
    );
}
