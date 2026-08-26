/* Shared reading experience for the nine long-form guides. Keeps the article
   useful after the first answer: orientation, authorship, related reading,
   and a clear next step without turning medical content into a sales page. */
(() => {
  const related = {
    "overthinking-vs-anxiety.html": [
      ["Scheduled worry time", "/blog/pages/adult/scheduled-worry-time-technique.html"],
      ["When to see a psychiatrist", "/blog/pages/adult/when-to-see-a-psychiatrist.html"]
    ],
    "scheduled-worry-time-technique.html": [
      ["Overthinking vs anxiety", "/blog/pages/adult/overthinking-vs-anxiety.html"],
      ["Sleep and the anxiety cycle", "/blog/pages/adult/sleep-and-anxiety-cycle.html"]
    ],
    "sleep-and-anxiety-cycle.html": [
      ["Stimulus control for sleep", "/blog/pages/adult/stimulus-control-therapy.html"],
      ["When to see a psychiatrist", "/blog/pages/adult/when-to-see-a-psychiatrist.html"]
    ],
    "stimulus-control-therapy.html": [
      ["Sleep and the anxiety cycle", "/blog/pages/adult/sleep-and-anxiety-cycle.html"],
      ["Scheduled worry time", "/blog/pages/adult/scheduled-worry-time-technique.html"]
    ],
    "when-to-see-a-psychiatrist.html": [
      ["Overthinking vs anxiety", "/blog/pages/adult/overthinking-vs-anxiety.html"],
      ["Sleep and the anxiety cycle", "/blog/pages/adult/sleep-and-anxiety-cycle.html"]
    ],
    "early-signs-of-autism.html": [
      ["Speech delay red flags", "/blog/pages/child/speech-delay-red-flags.html"],
      ["Sensory overload at home", "/blog/pages/child/sensory-overload-at-home.html"]
    ],
    "school-concerns-and-adhd.html": [
      ["Early signs of autism", "/blog/pages/child/early-signs-of-autism.html"],
      ["Sensory overload at home", "/blog/pages/child/sensory-overload-at-home.html"]
    ],
    "sensory-overload-at-home.html": [
      ["Early signs of autism", "/blog/pages/child/early-signs-of-autism.html"],
      ["School concerns and ADHD", "/blog/pages/child/school-concerns-and-adhd.html"]
    ],
    "speech-delay-red-flags.html": [
      ["Early signs of autism", "/blog/pages/child/early-signs-of-autism.html"],
      ["School concerns and ADHD", "/blog/pages/child/school-concerns-and-adhd.html"]
    ]
  };

  const slug = (value) => value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  const text = (selector, root = document) => root.querySelector(selector)?.textContent?.replace(/\s+/g, " ").trim() || "";
  const meta = (name) => document.querySelector(`meta[name="${name}"]`)?.content?.trim() || "";

  function addMetaBar(article) {
    const h1 = article.querySelector("h1");
    if (!h1 || article.querySelector(".article-meta-bar")) return;
    const bar = document.createElement("div");
    bar.className = "article-meta-bar";
    bar.innerHTML = `<span>${meta("blog-date") || "Practical guide"}</span><span>${meta("blog-readtime") || "Read at your pace"}</span><span>By Dr Anita Sharma</span>`;
    const lead = h1.parentElement?.querySelector(".lead");
    (lead || h1).after(bar);
  }

  function addTableOfContents(article) {
    if (article.querySelector(".article-toc")) return;
    const headings = [...article.querySelectorAll("h2")];
    if (headings.length < 2) return;
    headings.forEach((heading) => { if (!heading.id) heading.id = slug(heading.textContent || "section"); });
    const nav = document.createElement("nav");
    nav.className = "article-toc";
    nav.setAttribute("aria-label", "On this page");
    nav.innerHTML = `<strong>On this page</strong><ol>${headings.map((heading) => `<li><a href="#${heading.id}">${heading.textContent}</a></li>`).join("")}</ol>`;
    const intro = article.querySelector("section");
    (intro || article.firstElementChild)?.after(nav);
  }

  function addNextStep(article, file) {
    if (article.querySelector(".article-next-step")) return;
    const panel = document.createElement("section");
    panel.className = "article-next-step surface-soft panel";
    panel.setAttribute("aria-labelledby", "article-next-step-title");
    panel.innerHTML = `<p class="eyebrow">A practical next step</p><h2 id="article-next-step-title">You do not need a perfect explanation before asking for help</h2><p>Use this guide to notice patterns, not to diagnose yourself or your child. If the concern is persistent, distressing, or affecting daily life, a confidential first conversation can help you decide what to do next.</p><div class="cta-row"><a class="button-primary" href="/book.html">Book a consultation</a><a class="button-ghost" href="https://wa.me/919667863295" target="_blank" rel="noopener">Ask on WhatsApp</a><a class="button-ghost" href="/emergency.html">Urgent help</a></div>`;
    article.appendChild(panel);

    const choices = document.createElement("div");
    choices.className = "article-feedback";
    choices.setAttribute("role", "group");
    choices.setAttribute("aria-labelledby", "article-feedback-title");
    choices.innerHTML = `<span id="article-feedback-title">Was this guide useful?</span><button type="button" data-article-feedback="clearer">Yes, clearer now</button><button type="button" data-article-feedback="question">I still have a question</button><span class="article-feedback-status" aria-live="polite"></span>`;
    choices.addEventListener("click", (event) => {
      const button = event.target.closest("[data-article-feedback]");
      if (!button) return;
      const status = choices.querySelector(".article-feedback-status");
      status.textContent = button.dataset.articleFeedback === "clearer" ? "Thank you. You can keep reading or book when ready." : "That is okay. Bring your question to a consultation or contact the clinic.";
    });
    article.appendChild(choices);
  }

  function addRelated(article, file) {
    const links = related[file];
    if (!links || article.querySelector(".article-related")) return;
    const aside = document.createElement("aside");
    aside.className = "article-related surface panel";
    aside.setAttribute("aria-labelledby", "article-related-title");
    aside.innerHTML = `<p class="eyebrow">Keep exploring</p><h2 id="article-related-title">Related guides</h2><div class="article-related-grid">${links.map(([label, href]) => `<a class="article-related-link" href="${href}"><span>${label}</span><i data-lucide="arrow-right" aria-hidden="true"></i></a>`).join("")}</div>`;
    article.appendChild(aside);
  }

  function init() {
    const article = document.querySelector("main article");
    if (!article || !article.querySelector("h1")) return;
    const file = window.location.pathname.split("/").filter(Boolean).pop() || "";
    article.classList.add("article-reading");
    addMetaBar(article);
    addTableOfContents(article);
    addNextStep(article, file);
    addRelated(article, file);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init, { once: true });
  else init();
})();
