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
    Collapse,
    CardImg,
    Spinner,
    Pagination,
    PaginationItem,
    PaginationLink
} from "reactstrap";
import { useEffect, useState } from "react";

import Link from "next/link";
import { getOrders } from "../../api/orderListData";


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
        notes: "",
    });
    const [isFiltered, setIsFiltered] = useState(false);
    const [pagination, setPagination] = useState({
        page: 1,
        pageSize: 9,
        totalCount: 0
    });
    const [isLoading, setIsLoading] = useState(true);

    const toggle = () => setIsOpen(!isOpen);


    useEffect(() => {
        async function loadOrders() {
            try {
                setIsLoading(true);
                const result = await getOrders({ page: 1, pageSize: 9 });
                setOrders(result.data);
                setPagination({ page: 1, pageSize: 9, totalCount: result.totalCount });
                setIsFiltered(false);
            } catch (err) {
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        }
        loadOrders();
    }, []);
    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters((prev) => ({ ...prev, [name]: value }));
    };

    const applyFilters = async (page = 1) => {
        try {
            setIsLoading(true);
            const result = await getOrders({ ...filters, page, pageSize: pagination.pageSize });
            setOrders(result.data);
            setPagination({ ...pagination, page, totalCount: result.totalCount });
            setIsFiltered(Object.values(filters).some(v => v !== ""));
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };
    const clearFilters = () => {
        setFilters({
            vinyl: "", shirt: "", neededHelp: "", fulfilled: "",
            minPrice: "", maxPrice: "", minHours: "", maxHours: "",
            rating: "", notes: ""
        });
    };
    if (isLoading) {
        return (
            <>
                <Head>
                    <title>Orders - Clumsy Apparel</title>
                </Head>
                <div className={styles.page}>
                    <main className={styles.main}>
                        <Col className="text-center mt-5">
                            <Spinner color="primary" type="grow">Loading...</Spinner>
                            <Spinner color="primary" type="grow">Loading...</Spinner>
                            <Spinner color="primary" type="grow">Loading...</Spinner>
                        </Col>
                    </main>
                </div>
            </>
        )
    }
    return (
        <>
            <Head>
                <title>Orders - Clumsy Apparel</title>
                <meta name="description" content="Welcome to Clumsy Apparel" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className={`${styles.page}`}>
                <main className={styles.main}>
                    <Card className="card-custom">
                        <CardBody>
                            <CardTitle tag="h1" className="text-center">Order List</CardTitle>

                            {/* Filters Here */}

                            <Collapse isOpen={isOpen}>
                                <Form>
                                    <Row>
                                        <Col xs={12} md={4}>
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
                                        <Col xs={12} md={4}>
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
                                        <Col xs={12} md={4}>
                                            <FormGroup>
                                                <Label for="notesFilter">Notes</Label>
                                                <Input
                                                    id="notesFilter"
                                                    name="notes"
                                                    type="text"
                                                    placeholder="Filter by notes"
                                                    value={filters.notes}
                                                    onChange={handleFilterChange}
                                                />
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
                                        <Col xs={12} md={6}>
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
                                        <Col xs={12} md={6}>
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
                                    </Row>
                                    <Row>
                                        <Col xs={12} md={4}>
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
                                                    <option value="true">Yes</option>
                                                    <option value="false">No</option>
                                                </Input>
                                            </FormGroup>
                                        </Col>
                                        <Col xs={12} md={4}>
                                            <FormGroup>
                                                <Label for="fulfilled">Is it fulfilled?</Label>
                                                <Input id="fulfilled"
                                                    name="fulfilled"
                                                    type="select"
                                                    value={filters.fulfilled}
                                                    onChange={handleFilterChange}
                                                >
                                                    <option value="">Does not matter</option>
                                                    <option value="true">Yes</option>
                                                    <option value="false">No</option>
                                                </Input>
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
                                        </Col>
                                    </Row>
                                    <Row className="justify-content-end">
                                        <Col xs={12} md={4}>
                                        <Button
                                                color="secondary"
                                                className="w-100 w-md-auto"
                                                onClick={() => clearFilters()}
                                                type="button"
                                            >
                                                Clear Filters
                                            </Button>
                                            </Col>
                                            <Col xs={12} md={4}>
                                            <Button
                                                color="primary"
                                                className="w-100 w-md-auto"
                                                onClick={() => applyFilters(1)}
                                                type="button"
                                            >
                                                Apply Filters
                                            </Button>
                                        </Col>
                                    </Row>
                                </Form>
                            </Collapse>

                            {/* End Filter Component */}

                            <div className="d-flex justify-content-center mt-3">
                                <Button color="secondary" onClick={toggle} className="mb3">
                                    {isOpen ? "Hide Filters" : "Filters"}
                                </Button>
                            </div>
                            {isFiltered && (
                                <div className="text-center">
                                    <span className={styles.filterIndicator}>
                                        Showing filtered results
                                    </span>
                                </div>
                            )}
                            <div className="text-center my-3">
                                <p>Total Results: {pagination.totalCount}</p>
                            </div>
                            <Row>
                                {orders.length === 0 ? (
                                    <Col>
                                        <p className="text-center mt-3">No orders found</p>
                                    </Col>
                                ) : (
                                    orders.map((order) => (
                                        <Col xs={12} sm={6} md={4} key={order.id} className="mb-4">
                                            <Link href={`/orders/${order.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                                <Card>
                                                    <CardImg
                                                        top
                                                        width="100%"
                                                        src={order.imageURL ? `http://localhost:5000${order.imageURL}` : "/image-not-found.png"}
                                                        alt={`Order ${order.id} image`}
                                                        className="img-fluid"
                                                        style={{ height: "200px", objectFit: "cover" }}
                                                        onError={(e) => {
                                                            e.currentTarget.src = "/image-not-found.png";
                                                        }}
                                                    />
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
                                                        Date Created: {new Date(order.createdOn).toLocaleDateString()}
                                                    </CardFooter>
                                                </Card>
                                            </Link>
                                        </Col>
                                    )))}
                                <Col xs={12} className="d-flex justify-content-center gap-2 mt-3">
                                    <Pagination>
                                        <PaginationItem disabled={pagination.page === 1}>
                                            <PaginationLink previous onClick={() => applyFilters(pagination.page - 1)} />
                                        </PaginationItem>

                                        {(() => {
                                            const totalPages = Math.ceil(pagination.totalCount / pagination.pageSize);
                                            const pages = [];

                                            if (totalPages <= 6) {
                                                // Show all pages if 6 or fewer
                                                for (let i = 1; i <= totalPages; i++) {
                                                    pages.push(i);
                                                }
                                            } else {
                                                // Show first 6 pages, then last page
                                                for (let i = 1; i <= 6; i++) {
                                                    pages.push(i);
                                                }
                                                pages.push('...');
                                                pages.push(totalPages);
                                            }

                                            return pages.map((pageNum, index) =>
                                                pageNum === '...' ? (
                                                    <PaginationItem disabled key="ellipsis">
                                                        <PaginationLink>...</PaginationLink>
                                                    </PaginationItem>
                                                ) : (
                                                    <PaginationItem active={pageNum === pagination.page} key={pageNum}>
                                                        <PaginationLink onClick={() => applyFilters(pageNum)}>
                                                            {pageNum}
                                                        </PaginationLink>
                                                    </PaginationItem>
                                                )
                                            );
                                        })()}

                                        <PaginationItem disabled={pagination.page >= Math.ceil(pagination.totalCount / pagination.pageSize)}>
                                            <PaginationLink next onClick={() => applyFilters(pagination.page + 1)} />
                                        </PaginationItem>
                                    </Pagination>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </main>
            </div>
        </>
    );
}
