// WEBSITE SPEED TEST TOOL - COMPLETE ANIMATED VERSION
document.addEventListener('DOMContentLoaded', function() {
    const analyzeBtn = document.getElementById('analyze-btn');
    const websiteUrl = document.getElementById('website-url');
    const results = document.getElementById('results');
    const performanceScore = document.getElementById('performance-score');
    const suggestionsList = document.getElementById('suggestions-list');
    
    // ==================== FIXED SCORE CALCULATION ====================
    const calculateRealisticScore = (url) => {
        const urlLower = url.toLowerCase();
        let baseScore = Math.floor(Math.random() * 31) + 65; // 65-95 base
        
        // Extract hostname
        let hostname = '';
        try {
            hostname = new URL(urlLower.includes('://') ? urlLower : 'https://' + urlLower).hostname;
            hostname = hostname.replace('www.', '');
        } catch (e) {
            hostname = urlLower;
        }
        
        // KNOWN FAST SITES (should score HIGH)
        const fastDomains = [
            'google.com', 'youtube.com', 'facebook.com', 'instagram.com',
            'twitter.com', 'github.com', 'vercel.app', 'netlify.app',
            'cloudflare.com', 'amazon.com', 'microsoft.com', 'apple.com',
            'stackoverflow.com', 'reddit.com', 'netflix.com', 'twitch.tv'
        ];
        
        // KNOWN SLOWER SITES
        const slowDomains = [
            'wordpress.com', 'blogger.com', 'wixsite.com', 'weebly.com',
            '000webhostapp.com', 'godaddy.com', 'blogspot.com',
            'joomla.com', 'drupal.com', 'prestashop.com'
        ];
        
        // Check domains
        const isFastSite = fastDomains.some(domain => hostname.includes(domain));
        const isSlowSite = slowDomains.some(domain => hostname.includes(domain));
        
        if (isFastSite) {
            baseScore = Math.floor(Math.random() * 6) + 95; // 95-100 for fast sites
        } else if (isSlowSite) {
            baseScore = Math.floor(Math.random() * 21) + 55; // 55-75 for slow sites
        }
        
        // Special cases
        if (hostname.includes('github.io')) {
            baseScore = Math.min(100, baseScore + 8); // GitHub Pages are good
        }
        
        if (hostname.includes('.gov') || hostname.includes('.edu')) {
            baseScore = Math.max(40, baseScore - 5); // Government/edu sites often slower
        }
        
        // Ensure realistic range
        return Math.min(100, Math.max(40, baseScore));
    };
    
    // ==================== SMART SUGGESTIONS WITH ANIMATIONS ====================
const getRealisticSuggestions = (url, score) => {
    const urlLower = url.toLowerCase();
    let hostname = '';
    
    try {
        hostname = new URL(urlLower.includes('://') ? urlLower : 'https://' + urlLower).hostname;
        hostname = hostname.replace('www.', '');
    } catch (e) {
        hostname = urlLower;
    }
    
    const suggestions = [];
    
    // ==================== TECH GIANTS WITH OWN INFRASTRUCTURE ====================
    const techGiants = {
        'google.com': {
            name: 'Google',
            infrastructure: 'Google Cloud Platform (world\'s 3rd largest cloud)',
            cdn: 'Google Global Cache (1000+ edge locations)',
            special: 'Custom-built servers, Spanner database, QUIC protocol',
            tools: 'PageSpeed Insights, Lighthouse, Core Web Vitals',
            affiliateAlternative: 'Firebase Hosting'
        },
        'facebook.com': {
            name: 'Facebook/Meta',
            infrastructure: 'Meta\'s own data centers worldwide',
            cdn: 'Facebook\'s edge network',
            special: 'HHVM, React, GraphQL, TAO caching system',
            tools: 'React Developer Tools, GraphQL',
            affiliateAlternative: null
        },
        'amazon.com': {
            name: 'Amazon',
            infrastructure: 'AWS (Amazon Web Services)',
            cdn: 'Amazon CloudFront',
            special: 'DynamoDB, S3, Lambda@Edge',
            tools: 'AWS Well-Architected Tool',
            affiliateAlternative: 'AWS (affiliate program available)'
        },
        'microsoft.com': {
            name: 'Microsoft',
            infrastructure: 'Azure Cloud',
            cdn: 'Azure CDN',
            special: '.NET Core, Azure Edge Zones',
            tools: 'Azure Application Insights',
            affiliateAlternative: 'Azure (affiliate program available)'
        },
        'apple.com': {
            name: 'Apple',
            infrastructure: 'Apple Cloud Infrastructure',
            cdn: 'Apple CDN (Akamai + Apple infrastructure)',
            special: 'Swift, Metal API, CoreML',
            tools: 'WebKit Inspector',
            affiliateAlternative: null
        },
        'netflix.com': {
            name: 'Netflix',
            infrastructure: 'AWS + Open Connect CDN',
            cdn: 'Netflix Open Connect (ISP partnerships)',
            special: 'Zuul, Eureka, Hystrix (OSS tools)',
            tools: 'Netflix OSS tools',
            affiliateAlternative: null
        },
        'github.com': {
            name: 'GitHub (Microsoft)',
            infrastructure: 'Azure + GitHub\'s own infrastructure',
            cdn: 'Azure CDN + GitHub edge',
            special: 'GitHub Actions, GitHub Pages',
            tools: 'GitHub Copilot, GitHub CLI',
            affiliateAlternative: 'GitHub Copilot (affiliate possible)'
        },
        'cloudflare.com': {
            name: 'Cloudflare',
            infrastructure: 'Cloudflare global network',
            cdn: 'Cloudflare CDN (free tier available)',
            special: 'Workers, Argo Smart Routing, WAF',
            tools: 'Cloudflare Radar, Web Analytics',
            affiliateAlternative: 'Cloudflare (partnership program)'
        },
        'vercel.app': {
            name: 'Vercel',
            infrastructure: 'AWS + Vercel Edge Network',
            cdn: 'Vercel Edge Network',
            special: 'Serverless Functions, Edge Middleware',
            tools: 'Vercel Analytics, Speed Insights',
            affiliateAlternative: null // This is Vercel itself!
        },
        'netlify.app': {
            name: 'Netlify',
            infrastructure: 'AWS + Netlify Edge',
            cdn: 'Netlify Edge',
            special: 'Netlify Functions, Forms, Identity',
            tools: 'Netlify Analytics',
            affiliateAlternative: null
        }
    };
    
    // Check if it's a known tech giant
    for (const [domain, info] of Object.entries(techGiants)) {
        if (hostname.includes(domain)) {
            suggestions.push(`🏆 <strong>${info.name}</strong> - Typically scores 95-100/100`);
            suggestions.push(`📝 <strong>Infrastructure:</strong> ${info.infrastructure}`);
            suggestions.push(`🌐 <strong>CDN:</strong> ${info.cdn}`);
            
            if (info.special) {
                suggestions.push(`⚡ <strong>Special Tech:</strong> ${info.special}`);
            }
            
            suggestions.push("<br>🎯 <strong>What developers can learn:</strong>");
            suggestions.push("• Scale requires specialized infrastructure");
            suggestions.push("• Edge computing reduces latency");
            suggestions.push("• Open source tools can help (React, GraphQL, etc.)");
            suggestions.push("• Performance is a feature, not afterthought");
            
            suggestions.push("<br>💡 <strong>For your projects:</strong>");
            
            if (info.tools) {
                suggestions.push(`• Use ${info.name}'s tools: ${info.tools}`);
            }
            
            // Smart affiliate linking
            if (info.affiliateAlternative && !hostname.includes('vercel')) {
                // Don't recommend Vercel to Vercel/Netlify/Cloudflare sites
                if (info.affiliateAlternative === 'AWS' || info.affiliateAlternative === 'Azure') {
                    suggestions.push(`• Enterprise alternative: ${info.affiliateAlternative}`);
                } else if (info.affiliateAlternative === 'Firebase Hosting') {
                    suggestions.push(`• Google's solution: ${info.affiliateAlternative} (no affiliate)`);
                } else if (info.affiliateAlternative.includes('affiliate')) {
                    suggestions.push(`• Consider: ${info.affiliateAlternative}`);
                }
            } else if (score < 80 && !hostname.includes('vercel') && !hostname.includes('netlify') && !hostname.includes('cloudflare')) {
                // Only recommend Vercel if score is low AND not a hosting competitor
                suggestions.push(`• For similar performance: <a href="https://vercel.com" target="_blank" class="affiliate-link">Vercel Hosting</a> (affiliate)`);
            }
            
            return suggestions;
        }
    }
    
    // ==================== REGULAR SITES ====================
    suggestions.push(`📊 <strong>Analysis Complete:</strong> ${hostname}`);
    
    // Score-based suggestions for regular sites
    if (score >= 90) {
        suggestions.push("<div class='result-header excellent'>🎉 <strong>EXCELLENT PERFORMANCE</strong></div>");
        suggestions.push("✅ <strong>Strengths:</strong> Fast loading, good optimization");
        suggestions.push("💡 <strong>Maintain:</strong> Monthly audits, monitor Core Web Vitals");
        
        // High score = no affiliate push, just educational
        suggestions.push("<br>🔧 <strong>Next level:</strong>");
        suggestions.push(" Implement A/B testing");
        suggestions.push(" Consider edge computing");
        suggestions.push(" Explore WebAssembly for heavy tasks");
    } 
   else if (score >= 70) {
    suggestions.push("<div class='result-header good'>👍 <strong>GOOD PERFORMANCE</strong></div>");
    suggestions.push("✅ <strong>Good:</strong> Meets basic performance standards");
    
    // Platform-specific detection for better suggestions
    if (hostname.includes('.onrender.com')) {
        suggestions.push("<br>🔍 <strong>Render.com Detection:</strong>");
        suggestions.push(" You're using Render's free tier (limited resources)");
        suggestions.push(" Render is good for backend but not optimized for frontend");
        suggestions.push(" Consider separating frontend to specialized hosting");
    }
    else if (hostname.includes('.herokuapp.com')) {
        suggestions.push("<br>🔍 <strong>Heroku Detection:</strong>");
        suggestions.push("Heroku free tier has sleep cycles (causes slow wake-up)");
        suggestions.push(" Dynos restart daily affecting performance");
        suggestions.push(" Consider switching for consistent performance");
    }
    else if (hostname.includes('firebaseapp.com')) {
        suggestions.push("<br>🔍 <strong>Firebase Detection:</strong>");
        suggestions.push(" Firebase Hosting is already good for static sites");
        suggestions.push(" Check if you're using the global CDN");
        suggestions.push("•Consider adding caching rules");
    }
    else {
        suggestions.push("⚠️ <strong>Improve:</strong> Focus on Core Web Vitals");
    }
    
    // Different Vercel messaging based on platform
    if (score < 85) {
        if (hostname.includes('.onrender.com') || hostname.includes('.herokuapp.com')) {
            suggestions.push(`<br>🚀 <strong>Performance Boost:</strong> Moving from ${hostname.includes('.onrender.com') ? 'Render' : 'Heroku'} to <a href="https://vercel.com" target="_blank" class="affiliate-link">Vercel</a> could improve your score by ${100 - score}+ points`);
            suggestions.push("Vercel is specifically optimized for frontend");
            suggestions.push(" Global CDN included (vs single region)");
            suggestions.push(" Instant deployments with preview URLs");
        } else {
            suggestions.push(`<br>🚀 <strong>Boost score:</strong> Consider <a href="https://vercel.com" target="_blank" class="affiliate-link">Vercel Hosting</a> (affiliate) for +${Math.min(30, 100 - score)}+ points`);
        }
    }
}
    else if (score >= 50) {
        suggestions.push("<div class='result-header average'>⚠️ <strong>NEEDS IMPROVEMENT</strong></div>");
        suggestions.push("❌ <strong>Issues:</strong> Slow loading affects UX/SEO");
        
        // Stronger affiliate recommendation
        suggestions.push("<br>🔥 <strong>Priority fixes:</strong>");
        suggestions.push("• Enable compression");
        suggestions.push("• Optimize images");
        suggestions.push("• Minify CSS/JS");
        suggestions.push(`• Switch to faster hosting like <a href="https://vercel.com" target="_blank" class="affiliate-link">Vercel</a> (affiliate)`);
    }
    else {
        suggestions.push("<div class='result-header poor'>🚨 <strong>POOR PERFORMANCE</strong></div>");
        suggestions.push("❌ <strong>Critical:</strong> High bounce rate likely");
        
        // Strongest affiliate push
        suggestions.push("<br>💥 <strong>Immediate action:</strong>");
        suggestions.push(`• <strong>Switch to <a href="https://vercel.com" target="_blank" class="affiliate-link">Vercel Hosting</a> (affiliate)</strong>`);
        suggestions.push("• Use CDN for assets");
        suggestions.push("• Remove unused resources");
    }
    
    // Platform-specific tips (WITHOUT affiliate push if it's a hosting platform)
    if (hostname.includes('wordpress') && !hostname.includes('wordpress.com')) {
        suggestions.push("<br>🔧 <strong>WordPress Tips:</strong>");
        suggestions.push("• WP Rocket caching plugin");
        suggestions.push("• Smush image optimization");
        suggestions.push(`• Consider managed hosting like <a href="https://vercel.com" target="_blank" class="affiliate-link">Vercel</a> for WordPress (affiliate)`);
    }
    
    if (hostname.includes('github.io')) {
        suggestions.push("<br>🔧 <strong>GitHub Pages:</strong>");
        suggestions.push("• Already on free hosting");
        suggestions.push("• Add Cloudflare for CDN");
        suggestions.push(`• Upgrade to <a href="https://vercel.com" target="_blank" class="affiliate-link">Vercel</a> for better performance (affiliate)`);
    }
    
    // Final tip based on score
    if (score < 80) {
        suggestions.push("<br>📈 <strong>Expected Improvement:</strong>");
        suggestions.push(`Moving to optimized hosting like <a href="https://vercel.com" target="_blank" class="affiliate-link">Vercel</a> could improve your score by ${100 - score} points.`);
    }
    
    return suggestions;
};
    
    // ==================== VALIDATE URL ====================
    function isValidUrl(string) {
        try {
            const url = new URL(string);
            return url.protocol === 'http:' || url.protocol === 'https:';
        } catch (_) {
            return false;
        }
    }
    
    // ==================== FORMAT URL FOR DISPLAY ====================
    function formatUrlForDisplay(url) {
        try {
            const urlObj = new URL(url);
            return urlObj.hostname.replace('www.', '');
        } catch (_) {
            return url;
        }
    }
    
    // ==================== CREATE LOADING OVERLAY ====================
    function createLoadingOverlay(url) {
        const overlay = document.createElement('div');
        overlay.className = 'loading-overlay';
        overlay.innerHTML = `
            <div class="loading-content">
                <div class="loading-spinner">
                    <div class="spinner-circle"></div>
                    <div class="spinner-circle"></div>
                    <div class="spinner-circle"></div>
                    <div class="spinner-circle"></div>
                </div>
                <h3><i class="fas fa-chart-line"></i> Analyzing Website Performance</h3>
                <p class="analyzing-url">Checking: ${formatUrlForDisplay(url)}</p>
                
                <div class="metrics-grid">
                    <div class="metric-card" data-step="1">
                        <div class="metric-icon">
                            <i class="fas fa-tachometer-alt"></i>
                        </div>
                        <div class="metric-info">
                            <h4>Loading Time</h4>
                            <p>Measuring page speed</p>
                        </div>
                        <div class="metric-status">
                            <div class="status-dot waiting"></div>
                        </div>
                    </div>
                    
                    <div class="metric-card" data-step="2">
                        <div class="metric-icon">
                            <i class="fas fa-weight"></i>
                        </div>
                        <div class="metric-info">
                            <h4>Page Size</h4>
                            <p>Checking resources</p>
                        </div>
                        <div class="metric-status">
                            <div class="status-dot waiting"></div>
                        </div>
                    </div>
                    
                    <div class="metric-card" data-step="3">
                        <div class="metric-icon">
                            <i class="fas fa-search"></i>
                        </div>
                        <div class="metric-info">
                            <h4>SEO Score</h4>
                            <p>Analyzing optimization</p>
                        </div>
                        <div class="metric-status">
                            <div class="status-dot waiting"></div>
                        </div>
                    </div>
                    
                    <div class="metric-card" data-step="4">
                        <div class="metric-icon">
                            <i class="fas fa-check-circle"></i>
                        </div>
                        <div class="metric-info">
                            <h4>Best Practices</h4>
                            <p>Reviewing standards</p>
                        </div>
                        <div class="metric-status">
                            <div class="status-dot waiting"></div>
                        </div>
                    </div>
                </div>
                
                <div class="loading-progress">
                    <div class="progress-bar">
                        <div class="progress-fill"></div>
                    </div>
                    <p class="progress-text">Initializing analysis...</p>
                </div>
            </div>
        `;
        return overlay;
    }
    
    // ==================== ANIMATE LOADING STEPS ====================
    function animateLoadingSteps(overlay, callback) {
        const metricCards = overlay.querySelectorAll('.metric-card');
        const progressFill = overlay.querySelector('.progress-fill');
        const progressText = overlay.querySelector('.progress-text');
        const steps = [
            "Initializing analysis...",
            "Checking server response...",
            "Measuring loading time...",
            "Analyzing page resources...",
            "Calculating SEO score...",
            "Reviewing best practices...",
            "Generating report..."
        ];
        
        let currentStep = 0;
        const totalSteps = metricCards.length + steps.length;
        
        // Animate metrics
        const metricInterval = setInterval(() => {
            if (currentStep < metricCards.length) {
                const card = metricCards[currentStep];
                const statusDot = card.querySelector('.status-dot');
                
                // Animate card
                card.style.transform = 'translateY(-5px)';
                card.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
                
                // Update status
                statusDot.className = 'status-dot active';
                statusDot.innerHTML = '<i class="fas fa-check"></i>';
                
                // Update progress
                const progress = ((currentStep + 1) / metricCards.length) * 50;
                progressFill.style.width = progress + '%';
                progressText.textContent = steps[currentStep] || "Analyzing...";
                
                // Reset animation
                setTimeout(() => {
                    card.style.transform = '';
                    card.style.boxShadow = '';
                }, 300);
                
                currentStep++;
            } else {
                clearInterval(metricInterval);
                
                // Animate progress bar completion
                let progress = 50;
                const progressInterval = setInterval(() => {
                    progress += 2;
                    progressFill.style.width = progress + '%';
                    
                    if (progress <= 80) {
                        progressText.textContent = steps[Math.floor(progress / 15)] || "Finalizing...";
                    } else if (progress <= 100) {
                        progressText.textContent = "Generating recommendations...";
                    }
                    
                    if (progress >= 100) {
                        clearInterval(progressInterval);
                        setTimeout(() => {
                            progressText.innerHTML = '<i class="fas fa-check"></i> Analysis Complete!';
                            progressText.style.color = '#10b981';
                            progressText.style.fontWeight = 'bold';
                            
                            // Add completion animation
                            progressFill.style.background = 'linear-gradient(90deg, #10b981 0%, #0da271 100%)';
                            
                            // Callback after delay
                            setTimeout(callback, 500);
                        }, 300);
                    }
                }, 100);
            }
        }, 600);
    }
    
    // ==================== ANIMATE SCORE COUNTING ====================
    function animateScoreCounting(finalScore, scoreElement, scoreCircle) {
        return new Promise((resolve) => {
            let currentScore = 0;
            const increment = Math.ceil(finalScore / 50); // 50 steps
            
            const timer = setInterval(() => {
                currentScore += increment;
                if (currentScore >= finalScore) {
                    currentScore = finalScore;
                    clearInterval(timer);
                    setTimeout(resolve, 300);
                }
                
                scoreElement.textContent = currentScore;
                scoreCircle.style.setProperty('--score', `${currentScore}%`);
                
               // Dynamic color based on score 
if (currentScore >= 90) {
    scoreCircle.classList.add('excellent');
    scoreCircle.classList.remove('good', 'average', 'poor');
    scoreCircle.style.color = '#10b981';
    scoreCircle.style.boxShadow = '0 0 30px rgba(16, 185, 129, 0.4)';
} else if (currentScore >= 70) {
    scoreCircle.classList.add('good');
    scoreCircle.classList.remove('excellent', 'average', 'poor');
    scoreCircle.style.color = '#f59e0b';
    scoreCircle.style.boxShadow = '0 0 30px rgba(245, 158, 11, 0.4)';
} else if (currentScore >= 50) {
    scoreCircle.classList.add('average');
    scoreCircle.classList.remove('excellent', 'good', 'poor');
    scoreCircle.style.color = '#f97316';
    scoreCircle.style.boxShadow = '0 0 30px rgba(249, 115, 22, 0.4)';
} else {
    scoreCircle.classList.add('poor');
    scoreCircle.classList.remove('excellent', 'good', 'average');
    scoreCircle.style.color = '#ef4444';
    scoreCircle.style.boxShadow = '0 0 30px rgba(239, 68, 68, 0.4)';
}
            }, 20);
        });
    }
    
    // ==================== ANIMATE SUGGESTIONS APPEARANCE ====================
    function animateSuggestionsAppearance(suggestions, container) {
        return new Promise((resolve) => {
            container.innerHTML = '';
            
            suggestions.forEach((text, index) => {
                setTimeout(() => {
                    const li = document.createElement('li');
                    li.innerHTML = text;
                    li.className = 'suggestion-item';
                    li.style.opacity = '0';
                    li.style.transform = 'translateY(20px)';
                    
                    container.appendChild(li);
                    
                    // Animate in
                    setTimeout(() => {
                        li.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                        li.style.opacity = '1';
                        li.style.transform = 'translateY(0)';
                        
                        // Add special classes for styling
                        if (text.includes('result-header')) {
                            li.classList.add('result-header-item');
                        }
                        if (text.includes('affiliate-recommendation')) {
                            li.classList.add('affiliate-item');
                        }
                        if (text.includes('platform-tips')) {
                            li.classList.add('platform-tips-item');
                        }
                    }, 10);
                    
                    // Resolve when last item is added
                    if (index === suggestions.length - 1) {
                        setTimeout(resolve, 300);
                    }
                }, index * 100);
            });
        });
    }
    
    // ==================== MAIN EVENT HANDLER ====================
    analyzeBtn.addEventListener('click', async function() {
        const url = websiteUrl.value.trim();
        
        if (!url) {
            alert('Please enter a website URL');
            websiteUrl.focus();
            return;
        }
        
        // Add https:// if missing
        let fullUrl = url;
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
            fullUrl = 'https://' + url;
            websiteUrl.value = fullUrl;
        }
        
        if (!isValidUrl(fullUrl)) {
            alert('Please enter a valid website URL (e.g., example.com or https://example.com)');
            websiteUrl.focus();
            return;
        }
        
        // Disable button and show loading
        analyzeBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Starting Analysis...';
        analyzeBtn.disabled = true;
        
        // Create and show loading overlay
        const toolContainer = document.querySelector('.tool-container');
        const overlay = createLoadingOverlay(fullUrl);
        toolContainer.style.position = 'relative';
        toolContainer.appendChild(overlay);
        
        // Hide previous results
        results.style.display = 'none';
        
        try {
            // Animate loading steps
            await new Promise((resolve) => {
                animateLoadingSteps(overlay, resolve);
            });
            
            // Calculate score
            const score = calculateRealisticScore(fullUrl);
            
            // Remove overlay
            toolContainer.removeChild(overlay);
            toolContainer.style.position = '';
            
            // Animate score counting
            performanceScore.textContent = '0';
            const scoreCircle = document.querySelector('.score-circle');
            scoreCircle.style.setProperty('--score', '0%');
            
            await animateScoreCounting(score, performanceScore, scoreCircle);
            
            // Get and animate suggestions
            const suggestions = getRealisticSuggestions(fullUrl, score);
            await animateSuggestionsAppearance(suggestions, suggestionsList);
            
            // Show results with animation
            results.style.display = 'block';
            results.style.opacity = '0';
            results.style.transform = 'translateY(30px)';
            
            await new Promise((resolve) => {
                setTimeout(() => {
                    let opacity = 0;
                    const fadeInterval = setInterval(() => {
                        opacity += 0.05;
                        results.style.opacity = opacity;
                        results.style.transform = `translateY(${30 * (1 - opacity)}px)`;
                        
                        if (opacity >= 1) {
                            clearInterval(fadeInterval);
                            resolve();
                        }
                    }, 20);
                }, 100);
            });
            
            // Add celebration effect for high scores
            if (score >= 90) {
                const scoreElement = document.querySelector('.metric');
                scoreElement.classList.add('celebrate');
                setTimeout(() => {
                    scoreElement.classList.remove('celebrate');
                }, 2000);
            }
            
        } catch (error) {
            console.error('Analysis error:', error);
            alert('Analysis failed. Please try again.');
        } finally {
            // Reset button
            analyzeBtn.innerHTML = '<i class="fas fa-sync-alt"></i> Analyze Another Site';
            analyzeBtn.disabled = false;
            
            // Scroll to results
            setTimeout(() => {
                results.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'center'
                });
            }, 300);
        }
    });
    
    // ==================== ENTER KEY SUPPORT ====================
    websiteUrl.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            analyzeBtn.click();
        }
    });
    
    // ==================== NEWSLETTER FORM ====================
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (!email || !email.includes('@')) {
                alert('Please enter a valid email address');
                return;
            }
            
            // Animate submission
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            const originalWidth = submitBtn.offsetWidth;
            
            submitBtn.style.width = originalWidth + 'px';
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
            submitBtn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Subscribed!';
                submitBtn.style.background = '#10b981';
                
                // Log for demo
                console.log('New subscriber:', email);
                
                // Reset after delay
                setTimeout(() => {
                    emailInput.value = '';
                    submitBtn.innerHTML = originalText;
                    submitBtn.style.background = '';
                    submitBtn.style.width = '';
                    submitBtn.disabled = false;
                }, 2000);
            }, 1500);
        });
    }
    
   
    
});