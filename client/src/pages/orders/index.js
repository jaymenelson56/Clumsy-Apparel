import Head from "next/head";
import styles from "@/styles/Home.module.css";
import {
    Card,
    CardBody,
    CardTitle,
    Form,
    FormGroup,
    Label,
    Input,
    Row,
    Col,
    Button
} from "reactstrap";

export default function OrderList() {
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
                            <CardTitle tag="h1">Order List</CardTitle>

                            <Form>
                                {/* Row 1: Vinyl + Shirt */}
                                <Row>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="vinyl">Vinyl</Label>
                                            <Input
                                                id="vinylFilter"
                                                name="vinyl"
                                                type="text"
                                                placeholder="Filter by vinyl type"
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="shirt">Shirt</Label>
                                            <Input
                                                id="shirtFilter"
                                                name="shirt"
                                                type="text"
                                                placeholder="Filter by shirt type"
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="neededHelp">Help Needed</Label>
                                            <Input id="neededHelp" name="neededHelp" type="select">
                                                <option value="">Does not matter</option>
                                                <option value="yes">Yes</option>
                                                <option value="no">No</option>
                                            </Input>
                                        </FormGroup>
                                    </Col>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="fulfilled">Is it fulfilled?</Label>
                                            <Input id="fulfilled" name="fulfilled" type="select">
                                                <option value="">Does not matter</option>
                                                <option value="yes">Yes</option>
                                                <option value="no">No</option>
                                            </Input>
                                        </FormGroup>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="minPrice">Minimum Price</Label>
                                            <Input
                                                id="minPrice"
                                                name="minPrice"
                                                type="number"
                                                step="0.01"
                                                placeholder="Enter minimum price"
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="maxPrice">Maximum Price</Label>
                                            <Input
                                                id="maxPrice"
                                                name="maxPrice"
                                                type="number"
                                                step="0.01"
                                                placeholder="Enter maximum price"
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={4}>
                                        <FormGroup>
                                            <Label for="minHours">Minimum Hours</Label>
                                            <Input
                                                id="minHours"
                                                name="minHours"
                                                type="number"
                                                step="0.01"
                                                placeholder="Enter minimum hours"
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col md={4}>
                                        <FormGroup>
                                            <Label for="maxHours">Maximum Hours</Label>
                                            <Input
                                                id="maxHours"
                                                name="maxHours"
                                                type="number"
                                                step="0.01"
                                                placeholder="Enter maximum hours"
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col md={4}>
                                        <FormGroup>
                                            <Label for="rating">Rating</Label>
                                            <Input id="rating" name="rating" type="select">
                                                <option value="">Does not matter</option>
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="4">4</option>
                                                <option value="5">5</option>
                                            </Input>
                                        </FormGroup>
                                        <Button color="primary" className="mt-2 w-100">
                                            Apply Filters
                                        </Button>
                                    </Col>
                                </Row>
                            </Form>
                        </CardBody>
                    </Card>
                </main>
            </div>
        </>
    );
}
