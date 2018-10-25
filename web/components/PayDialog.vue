<template>
    <el-dialog title="温馨提示" :visible.sync="payModal" width="380px">
        <el-row style="margin-bottom:10px;text-align:center" v-if="validDays > 0 && validDays < 14">您的应用剩余{{validDays}}天过期，请及时充值！</el-row>
        <el-row style="margin-bottom:10px;text-align:center" v-if="validDays <= 0">您的应用已过期，请及时充值！</el-row>
        <el-row class="pay-modal">
            <p class="pay-modal-title">{{appName}}</p>
            <el-row class="pay-modal-price" v-for="(item,index) in payData" :key="index" :style="{borderColor:payIndex==index?'#fc5151':'#b0b0b0'}" @click.native="selectPrice(item,index)">
                <span>¥ {{item.price}} / {{item.year}}</span>
                <span class="pay-modal-tag" v-if="item.price_tag">{{item.price_tag}}</span>
            </el-row>
            <el-row class="pay-btn" @click.native="paySure">立即购买</el-row>
        </el-row>
    </el-dialog>
</template>
<script>
export default {
    data() {
        return {
            appName: "",
            validDays: 0,
            payModal: false,
            payIndex: 0,
            payData: [],
            selectData: {}
        };
    },
    async mounted() {
        this.payData = [];
        const res = await this.$axios.$get("/api/app/home/base/getAppValid");
        if (res && res.errmsg === "ok") {
            this.appName = res.data.name;
            this.validDays = res.data.valid_days;
            if (res.data.valid_days < 14) {
                this.payModal = true;
            }
            if (res.data.price) {
                this.payData.push({
                    price: res.data.price,
                    year: "1年期",
                    years: 1,
                    price_tag: res.data.price_tag
                });
            }
            // this.payData.push({
            //     price: res.data.old_price,
            //     year: "1年期",
            //     years: 1,
            //     price_tag: ""
            // });
            this.payData.push({
                price: res.data.price * 2,
                year: "2+1年期",
                years: 2,
                price_tag: "限时买二赠一"
            });
            this.selectData = this.payData[0];
        }
    },
    methods: {
        selectPrice(item, index) {
            this.payIndex = index;
            this.selectData = item;
        },
        async paySure() {
            const res = await this.$axios.$get(
                `/api/app/home/user/user/recharge?years=${
                    this.selectData.years
                }&redirect=${encodeURIComponent(location.href)}`
            );
            if (res && res.errmsg === "ok") {
                location.href = res.data;
            }
        }
    }
};
</script>

