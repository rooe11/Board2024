const postList = document.getElementById("postList");
const modal = document.getElementById("modal");
const modalAuthor = document.getElementById("modalAuthor");
const modalPostTitle = document.getElementById("modalPostTitle");
const modalKeyword = document.getElementById("modalKeyword");

let posts = [];

// 글 추가
document.getElementById("addPostButton").addEventListener("click", () => {
    const author = document.getElementById("author").value.trim();
    const title = document.getElementById("title").value.trim();
    const keyword = document.getElementById("keyword").value.trim();

    // 유효성 검사: 작성자, 제목, 키워드 모두 입력해야 함
    if (!author || !title || !keyword) {
        alert("작성자, 제목, 키워드를 모두 입력해야 합니다!");
        return;
    }

    const post = { author, title, keyword, id: Date.now(), recommended: false };
    posts.push(post);
    renderPosts();

    // 입력 필드 초기화
    document.getElementById("author").value = "";
    document.getElementById("title").value = "";
    document.getElementById("keyword").value = "";

    // 작성 완료 메시지 표시
    alert("글이 작성되었습니다!");
});

// 글 렌더링
function renderPosts() {
    postList.innerHTML = "";
    posts.forEach(post => {
        const li = document.createElement("li");
        li.innerHTML = `
            ${post.author} - ${post.title} (${post.keyword || "키워드 없음"})
            ${post.recommended ? "⭐ 추천 됨" : ""} 
            <button class="viewButton" data-id="${post.id}">상세보기</button>
        `;
        postList.appendChild(li);
    });

    // 상세보기 버튼에 이벤트 추가
    document.querySelectorAll(".viewButton").forEach(button => {
        button.addEventListener("click", () => {
            const postId = button.getAttribute("data-id");
            showPostDetails(postId);
        });
    });
}

// 상세보기 표시
function showPostDetails(id) {
    const post = posts.find(p => p.id == id);
    if (post) {
        modalAuthor.textContent = post.author;
        modalPostTitle.textContent = post.title;
        modalKeyword.textContent = post.keyword;

        // 삭제 버튼
        document.getElementById("deletePostButton").onclick = () => {
            posts = posts.filter(p => p.id != id);
            closeModal();
            renderPosts();
            alert("글이 삭제되었습니다!");
        };

        // 수정 버튼
        document.getElementById("editPostButton").onclick = () => {
            const newAuthor = prompt("새 작성자를 입력하세요:", post.author);
            const newTitle = prompt("새 제목을 입력하세요:", post.title);
            const newKeyword = prompt("새 키워드를 입력하세요:", post.keyword);

            if (newAuthor && newTitle && newKeyword) {
                post.author = newAuthor;
                post.title = newTitle;
                post.keyword = newKeyword;
                renderPosts();
                closeModal();
            } else {
                alert("수정 시 모든 항목을 입력해야 합니다!");
            }
        };

        // 추천 버튼
        document.getElementById("recommendPostButton").onclick = () => {
            post.recommended = true;
            renderPosts();
            alert(`"${post.title}"가 추천되었습니다!`);
            closeModal(); // 모달 창 닫기
        };

        modal.classList.remove("hidden");
    }
}

// 모달 닫기
document.getElementById("closeModalButton").addEventListener("click", closeModal);
function closeModal() {
    modal.classList.add("hidden");
}
