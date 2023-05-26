<template>
    <div class="home-container">
        <div class="home-upload-container">
            <div class="home-upload-wrapper" v-if="!isPaste && file.length === 0">
                <div class="home-upload-paste-wrapper" @click="onPasteText">
                    <img src="@/assets/paste.png" alt="" draggable="false" >
                    <p>
                        Paste the text or code here
                        <br>
                        (max 10,000 characters)
                    </p>
                </div>
                <div class="home-upload-pdf-wrapper" @click="openFileDialog">
                    <img src="@/assets/upload.png" alt="" draggable="false" >
                    <p>
                        or upload a PDF document
                        <br>
                        (max 5 pages)
                    </p>
                </div>
            </div>
            <div class="home-paste-input" v-if="isPaste">
                <a-textarea v-model:value="text" placeholder="Please enter basic data here" :rows='11' />
            </div>
            <div class="home-paste-input" v-if="file.length !== 0">
                <p>the PDF file has been uploaded.</p>
            </div>
            <button @click="formatText">
                <img src="@/assets/erase.png" alt="" draggable="false" >
                Clear & Cancel
            </button>
        </div>
        <div class="home-selection-wrapper">
            <select>
                <option>Choose a use for the text</option>
                <option value="Criticism">Criticism</option>
                <option value="Abstract">Abstract</option>
                <option value="Main ideas">Main ideas</option>
                <option value="Expand ideas">Expand ideas</option>
                <option value="Bibliography">Bibliography</option>
                <option value="Test me">Test me</option>
                <option value="Translate to English">Translate to English</option>
                <option value="Extract keywords">Extract keywords</option>
            </select>
            <div class="home-radio-wrapper">
                <div class="home-radio-item">
                    <input type="radio" name="answer-radio">
                    <label>faster</label>
                </div>
                <div class="home-radio-item">
                    <input type="radio" name="answer-radio">
                    <label>more precise</label>
                </div>
            </div>
            <button @click="onGenerate">Generate</button>
        </div>
    </div>
    <div class="home-result-loading-container" v-if="isLoading">
        <LoadingComponent />
    </div>
    <input type="file" ref="fileInput" id="fileInput" style="display:none;" accept=".pdf" @change="(e) => onFileSelected(e)">
    <div class="home-result-container" v-if="isGenerate">
        <label>Result</label>
        <a-textarea v-model:value="result" placeholder="The results will be displayed here." readonly="true" :rows='15' :ref="result" />
        <p>
            <button @click="copyText">
                <img src="@/assets/copy.png" alt="" draggable="false" >
                Copy
            </button>
        </p>
    </div>
</template>

<script>
import axios from 'axios';
import { LoadingComponent } from "@/components/loading";
import { SERVER_URI } from "@/config";
import { openNotification } from '@/components/notification';

export default {
    name: 'HomeView',
    components: { LoadingComponent },
    data() {
        return {
            isPaste: false,
            isGenerate: false,
            isLoading: false,
            file: [],
            area: '',
            text: '',
            result: ''
        }
    },
    methods: {
        onPasteText() {
            this.text = '';
            this.isPaste = true;
        },
        openFileDialog() {
            this.$refs.fileInput.click();
        },
        formatText() {
            this.isPaste = false;
            this.isGenerate = false;
            this.file = [];
            this.$refs.fileInput.value = "";

        },
        copyText() {
            
        },
        onGenerate() {
            this.isGenerate = false;
            this.isLoading = true;
            const formData = new FormData();

            if(!this.isPaste && this.file.length === 0) {
                openNotification('warn', 'Warn', 'Please upload the PDF file.');
                this.isLoading = false;
                return;
            }

            if(!this.isPaste) {
                formData.append('pdfFile', this.file);
                formData.append('userContent', 'Give me main idea from this content.');
            }

            // call GPT API 
            axios.post(
                `${SERVER_URI}${this.isPaste ? `/api/gpt/generate-answer` : `/api/users/uploadpdf`}`, 
                this.isPaste ? {baseText: this.text, userContent: 'Give me main idea from this content.'} : formData
            ).then(res => {
                if(res) {
                    this.result = res.data;
                    this.isLoading = false;
                    this.isGenerate = true;
                    this.file = [];
                    this.$refs.fileInput.value = "";
                }
            })
            .catch(err => {
                openNotification('warn', 'Warn', err.response.data.msg);
                this.isLoading = false;
                this.file = [];
                this.$refs.fileInput.value = "";
            })
        },
        onFileSelected(event) {
            console.log(event)
            const { files } = event.target;
            if(files.length === 0) return;
            this.file = files[0];
        }
    }
}
</script>

<style scoped>
    @import './styles.css';
</style>