/**
 * @file 身份证验证
 * @author hushicai02(hushicai02@baidu.com)
 */

// @see: http://zh.wikisource.org/zh/GB_11643-1999_%E5%85%AC%E6%B0%91%E8%BA%AB%E4%BB%BD%E5%8F%B7%E7%A0%81
// 
(function(root) {
    /**
    * 模与校验码映射表
    * 
    * @type {Object}
    */
    var modCheckCodeMap = {
        '0': '1',
        '1': '0',
        '2': 'X',
        '3': '9',
        '4': '8',
        '5': '7',
        '6': '6',
        '7': '5',
        '8': '4',
        '9': '3',
        '10': '2'
    };

    /**
    * 加权公式
    * 
    * @return {number} 指定位置上的加权值
    */
    function getW(i) {
        return Math.pow(2, i - 1) % 11;
    }

    /**
    * 判断身份证号是否合法
    * 
    * @return {boolean} 
    */
    function checkIdentity(str) {
        var sum = 0;
        // [1, 18)
        for(var i = 0; i < 17; i++) {
            // 加权因子
            var w = getW(18 - i);
            // 号码字符
            var a = +(str.charAt(i));

            // 累加
            sum += a * w;
        }

        var mod = sum % 11;
        var expectCheckCode = modCheckCodeMap[mod];
        var realCheckCode = str.charAt(17);

        return expectCheckCode === realCheckCode;
    }

    var identity = {
        check: checkIdentity
    };

    if (typeof exports == 'object' && typeof module == 'object') {
        exports = module.exports = identity;
    } else if(typeof define == 'function' && define.amd) {
        define(identity);
    } else {
        root.identity = identity;
    }
})(this);
