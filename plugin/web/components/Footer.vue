<template>
    <el-row class="footer">
        <span>{{$store.state.env.COPYRIGHT}}
            <a href="http://www.beian.miit.gov.cn">{{$store.state.env.ICP}}</a>
        </span>
    </el-row>
</template>

<script>
export default {
    data() {
        return {
            copyright: ""
        };
    },
    mounted() {
        this.copyright = this.getCoryright();
    }
};
</script>

<style scoped>
.footer {
    /* border-top: 1px solid hsla(0, 0%, 63%, .1); */
    font-size: 12px;
    width: 100%;
    line-height: 70px;
    text-align: center;
    /* background: #fff; */
    color: #9a9a9a;
    /* margin-top: 40px; */
    position: absolute;
    bottom: 0;
    left: 0;
}

.footer a {
    color: #409eff;
    background: 0 0;
    text-decoration: none;
    outline: 0;
    cursor: pointer;
    transition: color 0.2s ease;
}
</style>
