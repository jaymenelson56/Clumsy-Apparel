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

                            {/* Filter Section */}
                            <Form>
                                <FormGroup>
                                    <Label for="vinyl">Vinyl</Label>
                                    <Input
                                        id="vinylFilter"
                                        name="vinyl"
                                        type="text"
                                        placeholder="Filter by vinyl type"
                                    />
                                </FormGroup>

                                <FormGroup>
                                    <Label for="shirt">Shirt</Label>
                                    <Input
                                        id="shirtFilter"
                                        name="shirt"
                                        type="text"
                                        placeholder="Filter by shirt type"
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="neededHelp">Help Needed</Label>
                                    <Input id="neededHelp" name="neededHelp" type="select">
                                        <option value="">Does not matter</option>
                                        <option value="yes">Yes</option>
                                        <option value="no">No</option>
                                    </Input>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="fulfilled">Is it fulfilled?</Label>
                                    <Input Id="fulfilled" name="fulfilled" type="select">
                                        <option value="">Does not matter</option>
                                        <option value="">Yes</option>
                                        <option value="">No</option>

                                    </Input>
                                </FormGroup>
                            </Form>
                        </CardBody>
                    </Card>
                </main>
            </div>
        </>
    );
}