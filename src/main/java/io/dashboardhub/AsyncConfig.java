package io.dashboardhub;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.task.TaskExecutor;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;

@Configuration
@EnableAsync
public class AsyncConfig {

    @Value("${pool.size:10}")
    private int poolSize;;

    @Value("${queue.capacity:10}")
    private int queueCapacity;

    @Bean(name="taskExecutor")
    public TaskExecutor taskExecutor() {
        ThreadPoolTaskExecutor taskExecutor = new ThreadPoolTaskExecutor();
        taskExecutor.setMaxPoolSize(this.poolSize);
        taskExecutor.setQueueCapacity(this.queueCapacity);
        taskExecutor.afterPropertiesSet();
        return taskExecutor;
    }
}
