/* eslint-disable no-unused-vars */
// material-ui
import { useTheme } from '@mui/material/styles';
const Logo = () => {
    const theme = useTheme();
    return (
        <svg width="90" height="40" viewBox="0 0 90 70">
            <g transform="matrix(0.6306306 0 0 0.6306306 0.10360237 -0)">
                <path
                    d="M2.248 74.26L0.45 69.548C 4.62467 68.2253 7.828 66.634 10.06 64.774C 12.3333 62.9553 13.8833 61.054 14.71 59.07C 15.578 57.086 16.012 55.1847 16.012 53.366C 16.012 52.2087 15.888 51.0927 15.64 50.018C 15.392 48.9433 14.958 47.724 14.338 46.36C 13.718 44.996 12.85 43.3013 11.734 41.276L11.734 41.276L16.26 38.982C 17.8307 41.6687 18.9467 44.2107 19.608 46.608C 20.3107 49.0053 20.662 51.1133 20.662 52.932C 20.662 55.536 20.228 57.892 19.36 60C 18.5333 62.108 17.4173 63.968 16.012 65.58C 14.648 67.2333 13.1393 68.6387 11.486 69.796C 9.874 70.9533 8.24133 71.904 6.588 72.648C 4.976 73.392 3.52933 73.9293 2.248 74.26zM42.8076 60.31C 39.501 60.31 36.959 59.938 35.1816 59.194C 33.4456 58.45 32.247 57.2927 31.5856 55.722C 30.9243 54.1513 30.5523 52.126 30.4696 49.646L30.4696 49.646L29.2296 15.732L34.3136 15.732L35.5536 47.662C 35.6363 49.6873 35.8223 51.258 36.1116 52.374C 36.4423 53.4487 37.145 54.1927 38.2196 54.606C 39.3356 55.0193 41.0716 55.226 43.4276 55.226C 44.2956 55.226 44.9156 55.474 45.2876 55.97C 45.701 56.4247 45.9076 56.9827 45.9076 57.644C 45.9076 58.3053 45.6183 58.9253 45.0396 59.504C 44.461 60.0413 43.717 60.31 42.8076 60.31zM42.8086 60.31L43.4286 55.226C 45.4539 55.226 47.0659 55.102 48.2646 54.854C 49.4633 54.606 50.3313 54.11 50.8686 53.366C 51.4059 52.5807 51.6746 51.4233 51.6746 49.894C 51.6746 48.8607 51.5093 47.6413 51.1786 46.236C 50.8479 44.7893 50.4139 43.26 49.8766 41.648C 49.3393 40.036 48.7606 38.4447 48.1406 36.874L48.1406 36.874L53.1626 35.014C 53.6999 36.3367 54.1959 37.8453 54.6506 39.54C 55.1466 41.2347 55.5599 42.9087 55.8906 44.562C 56.2213 46.2153 56.3866 47.662 56.3866 48.902C 56.3866 50.5553 56.2006 52.0227 55.8286 53.304C 55.4979 54.544 54.9813 55.6187 54.2786 56.528C 53.5759 57.396 52.6666 58.1193 51.5506 58.698C 50.4759 59.2353 49.2153 59.6487 47.7686 59.938C 46.3219 60.186 44.6686 60.31 42.8086 60.31zM49.4426 71.842C 48.5746 71.842 47.8306 71.532 47.2106 70.912C 46.6319 70.3333 46.3426 69.6307 46.3426 68.804C 46.3426 67.9773 46.6319 67.254 47.2106 66.634C 47.8306 66.014 48.5746 65.704 49.4426 65.704C 50.2693 65.704 50.9719 66.014 51.5506 66.634C 52.1706 67.254 52.4806 67.9773 52.4806 68.804C 52.4806 69.6307 52.1706 70.3333 51.5506 70.912C 50.9719 71.532 50.2693 71.842 49.4426 71.842zM63.055 74.26L61.939 69.176C 64.419 68.8453 66.6923 68.37 68.759 67.75C 70.867 67.1713 72.665 66.324 74.153 65.208C 75.6823 64.092 76.8603 62.6247 77.687 60.806C 78.5137 58.9873 78.927 56.714 78.927 53.986C 78.927 52.7047 78.803 51.4853 78.555 50.328C 78.307 49.1293 77.935 48.0753 77.439 47.166C 76.943 46.2567 76.3437 45.5333 75.641 44.996C 74.9797 44.4587 74.215 44.19 73.347 44.19C 72.3963 44.19 71.5283 44.562 70.743 45.306C 69.999 46.0087 69.3997 46.918 68.945 48.034C 68.5317 49.15 68.325 50.266 68.325 51.382C 68.325 52.25 68.4903 53.0147 68.821 53.676C 69.193 54.296 69.7923 54.7713 70.619 55.102C 71.4457 55.4327 72.5203 55.598 73.843 55.598C 75.0417 55.598 76.2403 55.474 77.439 55.226C 78.679 54.978 79.733 54.6473 80.601 54.234L80.601 54.234L80.849 58.574C 79.857 59.2767 78.679 59.7727 77.315 60.062C 75.9923 60.3513 74.649 60.496 73.285 60.496C 71.7143 60.496 70.309 60.3307 69.069 60C 67.8703 59.6693 66.837 59.194 65.969 58.574C 65.1423 57.9127 64.5017 57.086 64.047 56.094C 63.6337 55.102 63.427 53.9447 63.427 52.622C 63.427 51.0513 63.675 49.4807 64.171 47.91C 64.667 46.298 65.3697 44.8307 66.279 43.508C 67.1883 42.1853 68.2837 41.1313 69.565 40.346C 70.8463 39.5193 72.2723 39.106 73.843 39.106C 75.4963 39.106 76.943 39.54 78.183 40.408C 79.423 41.2347 80.4563 42.3713 81.283 43.818C 82.1097 45.2647 82.7297 46.8973 83.143 48.716C 83.5563 50.5347 83.763 52.4153 83.763 54.358C 83.763 58.202 82.9777 61.5087 81.407 64.278C 79.8777 67.0887 77.563 69.3207 74.463 70.974C 71.4043 72.6273 67.6017 73.7227 63.055 74.26zM87.4375 74.26L85.6395 69.548C 89.8141 68.2253 93.0175 66.634 95.2495 64.774C 97.5228 62.9553 99.0728 61.054 99.8995 59.07C 100.767 57.086 101.201 55.1847 101.201 53.366C 101.201 52.2087 101.077 51.0927 100.829 50.018C 100.581 48.9433 100.147 47.724 99.5275 46.36C 98.9075 44.996 98.0395 43.3013 96.9235 41.276L96.9235 41.276L101.449 38.982C 103.02 41.6687 104.136 44.2107 104.797 46.608C 105.5 49.0053 105.851 51.1133 105.851 52.932C 105.851 55.536 105.417 57.892 104.549 60C 103.723 62.108 102.607 63.968 101.201 65.58C 99.8375 67.2333 98.3288 68.6387 96.6755 69.796C 95.0635 70.9533 93.4308 71.904 91.7775 72.648C 90.1655 73.392 88.7188 73.9293 87.4375 74.26zM127.997 60.31C 124.69 60.31 122.148 59.938 120.371 59.194C 118.635 58.45 117.436 57.2927 116.775 55.722C 116.114 54.1513 115.742 52.126 115.659 49.646L115.659 49.646L114.419 15.732L119.503 15.732L120.743 47.662C 120.826 49.6873 121.012 51.258 121.301 52.374C 121.632 53.4487 122.334 54.1927 123.409 54.606C 124.525 55.0193 126.261 55.226 128.617 55.226C 129.485 55.226 130.105 55.474 130.477 55.97C 130.89 56.4247 131.097 56.9827 131.097 57.644C 131.097 58.3053 130.808 58.9253 130.229 59.504C 129.65 60.0413 128.906 60.31 127.997 60.31zM127.998 60.31L128.618 55.226L134.446 55.226C 136.885 55.226 138.807 55.102 140.212 54.854C 141.659 54.5647 142.713 54.2133 143.374 53.8C 144.077 53.3453 144.531 52.87 144.738 52.374C 144.986 51.8367 145.11 51.2993 145.11 50.762C 145.11 49.8113 144.738 48.6333 143.994 47.228C 143.291 45.8227 141.824 44.004 139.592 41.772C 138.435 40.6147 137.277 39.5607 136.12 38.61C 134.963 37.618 133.888 36.75 132.896 36.006C 131.945 35.2207 131.181 34.5593 130.602 34.022C 130.023 33.4847 129.734 33.0713 129.734 32.782C 129.734 32.162 129.775 31.5627 129.858 30.984C 129.982 30.4053 130.127 29.868 130.292 29.372C 130.499 28.876 130.747 28.4833 131.036 28.194C 131.863 27.326 132.917 26.458 134.198 25.59C 135.521 24.722 137.05 23.8127 138.786 22.862C 140.563 21.9113 142.547 20.8987 144.738 19.824C 146.97 18.708 149.409 17.4887 152.054 16.166L152.054 16.166L154.162 20.754C 150.855 22.3247 148.086 23.668 145.854 24.784C 143.663 25.8587 141.803 26.83 140.274 27.698C 138.745 28.5247 137.401 29.31 136.244 30.054C 135.087 30.798 133.909 31.6247 132.71 32.534L132.71 32.534L133.64 30.178C 136.244 32.2447 138.538 34.1873 140.522 36.006C 142.547 37.8247 144.242 39.5813 145.606 41.276C 146.97 42.9293 148.003 44.562 148.706 46.174C 149.409 47.786 149.76 49.4187 149.76 51.072C 149.76 51.9813 149.595 52.9733 149.264 54.048C 148.933 55.1227 148.231 56.1353 147.156 57.086C 146.081 58.0367 144.469 58.822 142.32 59.442C 140.171 60.0207 137.277 60.31 133.64 60.31L133.64 60.31L127.998 60.31z"
                    stroke="none"
                    fill="#199188"
                    fillRule="nonzero"
                />
                <path
                    d="M4.96591 93.017L4.96591 91.4545L15.875 91.4545L15.875 93.017L11.3011 93.017L11.3011 106L9.53977 106L9.53977 93.017L4.96591 93.017zM18.5934 106L18.5934 91.4545L27.3718 91.4545L27.3718 93.017L20.3548 93.017L20.3548 97.9318L26.9173 97.9318L26.9173 99.4943L20.3548 99.4943L20.3548 104.438L27.4854 104.438L27.4854 106L18.5934 106zM42.2511 96L40.4897 96C 40.3855 95.4934 40.2032 95.0483 39.9428 94.6648C 39.6871 94.2812 39.3746 93.9593 39.0053 93.6989C 38.6407 93.4337 38.2359 93.2348 37.7908 93.1023C 37.3458 92.9697 36.8817 92.9034 36.3988 92.9034C 35.5181 92.9034 34.7203 93.1259 34.0053 93.571C 33.2951 94.0161 32.7293 94.6719 32.3079 95.5384C 31.8912 96.4048 31.6829 97.4678 31.6829 98.7273C 31.6829 99.9867 31.8912 101.05 32.3079 101.916C 32.7293 102.783 33.2951 103.438 34.0053 103.884C 34.7203 104.329 35.5181 104.551 36.3988 104.551C 36.8817 104.551 37.3458 104.485 37.7908 104.352C 38.2359 104.22 38.6407 104.023 39.0053 103.763C 39.3746 103.498 39.6871 103.173 39.9428 102.79C 40.2032 102.402 40.3855 101.956 40.4897 101.455L40.4897 101.455L42.2511 101.455C 42.1185 102.198 41.877 102.863 41.5266 103.45C 41.1763 104.037 40.7406 104.537 40.2198 104.949C 39.699 105.356 39.1142 105.666 38.4656 105.879C 37.8216 106.092 37.1327 106.199 36.3988 106.199C 35.1583 106.199 34.055 105.896 33.0891 105.29C 32.1232 104.684 31.3633 103.822 30.8093 102.705C 30.2553 101.587 29.9783 100.261 29.9783 98.7273C 29.9783 97.1932 30.2553 95.8674 30.8093 94.75C 31.3633 93.6326 32.1232 92.7708 33.0891 92.1648C 34.055 91.5587 35.1583 91.2557 36.3988 91.2557C 37.1327 91.2557 37.8216 91.3622 38.4656 91.5753C 39.1142 91.7884 39.699 92.1009 40.2198 92.5128C 40.7406 92.92 41.1763 93.4171 41.5266 94.0043C 41.877 94.5866 42.1185 95.2519 42.2511 96zM45.0973 106L45.0973 91.4545L46.8587 91.4545L46.8587 97.9318L54.6143 97.9318L54.6143 91.4545L56.3757 91.4545L56.3757 106L54.6143 106L54.6143 99.4943L46.8587 99.4943L46.8587 106L45.0973 106zM71.4361 91.4545L71.4361 106L69.7315 106L61.8054 94.5795L61.6634 94.5795L61.6634 106L59.902 106L59.902 91.4545L61.6065 91.4545L69.5611 102.903L69.7031 102.903L69.7031 91.4545L71.4361 91.4545zM87.2333 98.7273C 87.2333 100.261 86.9563 101.587 86.4023 102.705C 85.8484 103.822 85.0884 104.684 84.1225 105.29C 83.1566 105.896 82.0534 106.199 80.8129 106.199C 79.5723 106.199 78.4691 105.896 77.5032 105.29C 76.5373 104.684 75.7773 103.822 75.2234 102.705C 74.6694 101.587 74.3924 100.261 74.3924 98.7273C 74.3924 97.1932 74.6694 95.8674 75.2234 94.75C 75.7773 93.6326 76.5373 92.7708 77.5032 92.1648C 78.4691 91.5587 79.5723 91.2557 80.8129 91.2557C 82.0534 91.2557 83.1566 91.5587 84.1225 92.1648C 85.0884 92.7708 85.8484 93.6326 86.4023 94.75C 86.9563 95.8674 87.2333 97.1932 87.2333 98.7273zM85.5288 98.7273C 85.5288 97.4678 85.3181 96.4048 84.8967 95.5384C 84.48 94.6719 83.9142 94.0161 83.1992 93.571C 82.489 93.1259 81.6935 92.9034 80.8129 92.9034C 79.9322 92.9034 79.1344 93.1259 78.4194 93.571C 77.7092 94.0161 77.1433 94.6719 76.7219 95.5384C 76.3053 96.4048 76.0969 97.4678 76.0969 98.7273C 76.0969 99.9867 76.3053 101.05 76.7219 101.916C 77.1433 102.783 77.7092 103.438 78.4194 103.884C 79.1344 104.329 79.9322 104.551 80.8129 104.551C 81.6935 104.551 82.489 104.329 83.1992 103.884C 83.9142 103.438 84.48 102.783 84.8967 101.916C 85.3181 101.05 85.5288 99.9867 85.5288 98.7273zM90.195 106L90.195 91.4545L91.9563 91.4545L91.9563 104.438L98.7177 104.438L98.7177 106L90.195 106zM113.151 98.7273C 113.151 100.261 112.874 101.587 112.32 102.705C 111.766 103.822 111.006 104.684 110.04 105.29C 109.075 105.896 107.971 106.199 106.731 106.199C 105.49 106.199 104.387 105.896 103.421 105.29C 102.455 104.684 101.695 103.822 101.141 102.705C 100.587 101.587 100.31 100.261 100.31 98.7273C 100.31 97.1932 100.587 95.8674 101.141 94.75C 101.695 93.6326 102.455 92.7708 103.421 92.1648C 104.387 91.5587 105.49 91.2557 106.731 91.2557C 107.971 91.2557 109.075 91.5587 110.04 92.1648C 111.006 92.7708 111.766 93.6326 112.32 94.75C 112.874 95.8674 113.151 97.1932 113.151 98.7273zM111.447 98.7273C 111.447 97.4678 111.236 96.4048 110.815 95.5384C 110.398 94.6719 109.832 94.0161 109.117 93.571C 108.407 93.1259 107.612 92.9034 106.731 92.9034C 105.85 92.9034 105.052 93.1259 104.337 93.571C 103.627 94.0161 103.061 94.6719 102.64 95.5384C 102.223 96.4048 102.015 97.4678 102.015 98.7273C 102.015 99.9867 102.223 101.05 102.64 101.916C 103.061 102.783 103.627 103.438 104.337 103.884C 105.052 104.329 105.85 104.551 106.731 104.551C 107.612 104.551 108.407 104.329 109.117 103.884C 109.832 103.438 110.398 102.783 110.815 101.916C 111.236 101.05 111.447 99.9867 111.447 98.7273zM126.056 96C 125.9 95.5218 125.694 95.0933 125.438 94.7145C 125.187 94.331 124.887 94.0043 124.536 93.7344C 124.191 93.4645 123.798 93.2585 123.357 93.1165C 122.917 92.9744 122.434 92.9034 121.908 92.9034C 121.047 92.9034 120.263 93.1259 119.558 93.571C 118.852 94.0161 118.291 94.6719 117.874 95.5384C 117.458 96.4048 117.249 97.4678 117.249 98.7273C 117.249 99.9867 117.46 101.05 117.881 101.916C 118.303 102.783 118.873 103.438 119.593 103.884C 120.313 104.329 121.122 104.551 122.022 104.551C 122.855 104.551 123.589 104.374 124.224 104.018C 124.863 103.659 125.36 103.152 125.715 102.499C 126.075 101.84 126.255 101.066 126.255 100.176L126.255 100.176L126.795 100.29L122.42 100.29L122.42 98.7273L127.96 98.7273L127.96 100.29C 127.96 101.488 127.704 102.529 127.192 103.415C 126.686 104.3 125.985 104.987 125.09 105.474C 124.2 105.957 123.177 106.199 122.022 106.199C 120.734 106.199 119.603 105.896 118.627 105.29C 117.656 104.684 116.899 103.822 116.354 102.705C 115.815 101.587 115.545 100.261 115.545 98.7273C 115.545 97.5767 115.699 96.5421 116.006 95.6236C 116.319 94.7003 116.759 93.9143 117.327 93.2656C 117.896 92.617 118.568 92.1198 119.344 91.7741C 120.121 91.4285 120.976 91.2557 121.908 91.2557C 122.675 91.2557 123.39 91.3717 124.053 91.6037C 124.721 91.831 125.315 92.1553 125.836 92.5767C 126.362 92.9934 126.799 93.4929 127.15 94.0753C 127.5 94.6529 127.742 95.2945 127.874 96L127.874 96L126.056 96zM132.738 91.4545L132.738 106L130.976 106L130.976 91.4545L132.738 91.4545zM136.269 106L136.269 91.4545L145.048 91.4545L145.048 93.017L138.031 93.017L138.031 97.9318L144.593 97.9318L144.593 99.4943L138.031 99.4943L138.031 104.438L145.161 104.438L145.161 106L136.269 106zM156.177 95.0909C 156.092 94.3712 155.746 93.8125 155.14 93.4148C 154.534 93.017 153.79 92.8182 152.91 92.8182C 152.266 92.8182 151.702 92.9223 151.219 93.1307C 150.741 93.339 150.367 93.6255 150.097 93.9901C 149.832 94.3546 149.7 94.7689 149.7 95.233C 149.7 95.6212 149.792 95.955 149.977 96.2344C 150.166 96.509 150.407 96.7386 150.701 96.9233C 150.995 97.1032 151.302 97.2524 151.624 97.3707C 151.946 97.4844 152.242 97.5767 152.512 97.6477L152.512 97.6477L153.989 98.0455C 154.368 98.1449 154.79 98.2822 155.254 98.4574C 155.722 98.6326 156.17 98.8717 156.596 99.1747C 157.027 99.473 157.382 99.8565 157.661 100.325C 157.941 100.794 158.08 101.369 158.08 102.051C 158.08 102.837 157.874 103.547 157.462 104.182C 157.055 104.816 156.459 105.321 155.673 105.695C 154.891 106.069 153.942 106.256 152.825 106.256C 151.783 106.256 150.881 106.088 150.119 105.751C 149.361 105.415 148.764 104.946 148.329 104.345C 147.898 103.744 147.654 103.045 147.597 102.25L147.597 102.25L149.415 102.25C 149.463 102.799 149.647 103.254 149.969 103.614C 150.296 103.969 150.708 104.234 151.205 104.409C 151.707 104.58 152.247 104.665 152.825 104.665C 153.497 104.665 154.101 104.556 154.636 104.338C 155.171 104.116 155.594 103.808 155.907 103.415C 156.219 103.017 156.376 102.553 156.376 102.023C 156.376 101.54 156.241 101.147 155.971 100.844C 155.701 100.541 155.346 100.295 154.906 100.105C 154.465 99.9157 153.989 99.75 153.478 99.608L153.478 99.608L151.688 99.0966C 150.552 98.7699 149.652 98.3035 148.989 97.6974C 148.326 97.0914 147.995 96.2983 147.995 95.3182C 147.995 94.5038 148.215 93.7936 148.656 93.1875C 149.101 92.5767 149.697 92.1032 150.445 91.767C 151.198 91.4261 152.039 91.2557 152.967 91.2557C 153.904 91.2557 154.737 91.4238 155.467 91.7599C 156.196 92.0914 156.773 92.5459 157.2 93.1236C 157.63 93.7012 157.858 94.357 157.881 95.0909L157.881 95.0909L156.177 95.0909z"
                    stroke="none"
                    fill="#199188"
                    fillRule="nonzero"
                />
            </g>
        </svg>
    );
};

export default Logo;
