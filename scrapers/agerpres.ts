import { DOMParser } from "https://deno.land/x/deno_dom/deno-dom-wasm.ts";

const PLATFORM_BASE_URL = "https://www.agerpres.ro";

const fetchArticlesByCategory = async function (
    category: string,
    page: number = 1
) {
    const url = `${PLATFORM_BASE_URL}/${category}`;

    try {
        console.log("Fetching data from: " + url);
        const res = await fetch(url);
        const html = await res.text();

        const doc: any = new DOMParser().parseFromString(html, "text/html");

        const articles = doc.querySelectorAll("article");

        articles.forEach((el: any) => {
            try {
                const details = el.querySelector("div .details_unit_news");

                const url = details
                    .querySelector(".title_news > h2 > a")
                    .getAttribute("href");

                const title = details.querySelector(".title_news > h2 > a")
                    .textContent;

                const description = "";
                const publishedAt = details
                    .querySelector(".publish_time > time")
                    .getAttribute("datetime");

                console.log(
                    JSON.stringify({ url, title, description, publishedAt })
                );
            } catch (ex) {}
        });
        // console.log(articles);
    } catch (error) {
        console.log(error);
    }
};

export { fetchArticlesByCategory };
