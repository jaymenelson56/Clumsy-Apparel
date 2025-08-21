import Head from "next/head";
import styles from "@/styles/Home.module.css";
import {
    Card,
    CardBody,
    CardTitle,
} from "reactstrap";

export default function Data() {
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
                            <CardTitle tag="h1">Data</CardTitle>
                        </CardBody>
                    </Card>
                </main>
            </div>
        </>
    );
}
