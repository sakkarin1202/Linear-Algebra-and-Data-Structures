const stackContainer = document.getElementById('stack-container');
const block = document.querySelector('.block');
const block2 = document.querySelector('.block2');
const isEmptyElement = document.getElementById('is-empty');
const isFullElement = document.getElementById('is-full');
const countElement = document.getElementById('count');
const peekElement = document.getElementById('peek');
const changeElement = document.getElementById('change');
let stack = [];

function isEmpty() {
    return stack.length === 0;
}

function isFull() {
    const stackCapacity = 5;
    return stack.length === stackCapacity;
}

function updateStatus() {   
    if (isFull) {
        document.getElementById('is-full').classList.add('full');
    } else {
        document.getElementById('is-full').classList.remove('full');
    }
}


function count() {
    return stack.length;
}

function peek() {
    if (!isEmpty()) {
        const positions = stack.map((block, index) => {
            const blockType = block.classList.contains('block') ? 'Block' : 'Block2';
            return `Position ${index + 1}: ${blockType}`;
        });

        const message = positions.join('\n');
        alert(`Peek:\n${message}`);
    } else {
        alert('Stack is empty. Cannot peek.');
    }
}
peekElement.addEventListener('click', peek);

function change() {
    if (!isEmpty()) {
        // Shuffle the stack array to change positions
        stack = stack.sort(() => Math.random() - 0.5);

        // Remove all blocks from the stack container
        stackContainer.innerHTML = '';

        // Append the shuffled blocks back to the stack container
        stack.forEach((block) => {
            stackContainer.appendChild(block);
        });

        // Update status
        updateStatus();
    } else {
        alert('Stack is empty. Cannot change.');
    }
}

changeElement.addEventListener('click', change);


// ... (existing code)

block.addEventListener('dragstart', (e) => {
    e.dataTransfer.setData('text/plain', 'block');
});

block2.addEventListener('dragstart', (e) => {
    e.dataTransfer.setData('text/plain', 'block2');
});

stackContainer.addEventListener('dragover', (e) => {
    e.preventDefault();
});

stackContainer.addEventListener('drop', (e) => {
    e.preventDefault();
    const data = e.dataTransfer.getData('text/plain');
    const newBlock = (data === 'block') ? block.cloneNode(true) : block2.cloneNode(true);

    if ((data === 'block' || data === 'block2') && !isFull()) {
        stackContainer.appendChild(newBlock);
        stack.push(newBlock);

        // Update status
        updateStatus();
        
        newBlock.addEventListener('dblclick', () => {
            stackContainer.removeChild(newBlock);
            stack = stack.filter(item => item !== newBlock);
            // Update status
            updateStatus();
        });
    }
});

stackContainer.addEventListener('dblclick', (e) => {
    if (e.target.classList.contains('block') || e.target.classList.contains('block2')) {
        stackContainer.removeChild(e.target);
        stack = stack.filter(item => item !== e.target);
        // Update status
        updateStatus();
    }
});

function updateStatus() {
    isEmptyElement.textContent = isEmpty() ? '0' : 'Not Empty';
    isFullElement.textContent = isFull() ? 'Full' : 'Not Full';
    countElement.textContent = count();
    peekElement.addEventListener('click', peek);


}